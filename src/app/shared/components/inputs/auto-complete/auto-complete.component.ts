import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from "@angular/common";

import {FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule} from "@angular/forms";
import {FloatLabelModule} from "primeng/floatlabel";
import {TooltipModule} from "primeng/tooltip";

import {FieldsService} from "../../../services/fields/fields.service";
import {AutoCompleteModule} from "primeng/autocomplete";

import {AutoFocusModule} from "primeng/autofocus";
import {AppControlValueAccessor} from "../app-control-value";
import {DynamicQueryService} from "../../../../services/dynamic-query/dynamic-query.service";
import {DynamicQuery} from "../../../../services/dynamic-query/dynamic-query";
import {CookieService} from "ngx-cookie-service";
import {EnumCookie} from "../../../services/cookies/cookie.enum";

@Component({
  selector: 'app-auto-complete',
  standalone: true,
  imports: [
    CommonModule,
    AutoCompleteModule,
    FormsModule,
    ReactiveFormsModule,
    FloatLabelModule,
    TooltipModule,
    AutoFocusModule
  ],
  providers: [
    DynamicQueryService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: AutoCompleteComponent,
      multi: true
    }
  ],
  templateUrl: './auto-complete.component.html',
  styleUrl: './auto-complete.component.scss'
})
export class AutoCompleteComponent extends AppControlValueAccessor{

  @Input() optionLabel: string = "";
  @Input() route: string = "";

  @Input() defaultFilter: string = "";

  @Output() onSelectChange: EventEmitter<any> = new EventEmitter();

  public itens: any[] = [];

  constructor(
    private readonly fieldServiceInputText: FieldsService,
    private readonly dynamicService: DynamicQueryService,
    private readonly coockieService: CookieService
  ){
    super(fieldServiceInputText)
  }

  onFilter(value: any): void{
    var req = this.onRequestData(value);
    this.dynamicService.onDynamicQueryByContext(req).subscribe({
      next: (res) => {
        this.itens = res.paging.data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  //
  onRequestData(value: any): DynamicQuery{
    let req = new DynamicQuery();
    req.limit = 5;
    req.page = 1;
    req.route = this.route;
    req.doID = parseInt(this.coockieService.get(EnumCookie.DOID));
    req.filter = ` 1 = 1  and (NOME like '%${value.query}%' or ID like '%${value.query}%' ) `
    return req;
  }

  onSelected(){
    this.onSelectChange.emit(this.value);
  }
}
