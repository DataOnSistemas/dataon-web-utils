import {Component, EventEmitter, Input, Output} from '@angular/core';
import { TableModule } from 'primeng/table';
import {DataTable} from "./datatable";
import {PaginatorModule, PaginatorState} from "primeng/paginator";
import {IconFieldModule} from "primeng/iconfield";
import {InputIconModule} from "primeng/inputicon";
import { ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {CommonModule, DatePipe} from "@angular/common";
import {RequestData} from "../../inputs/request-data";

@Component({
  selector: 'app-datatable',
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    TableModule,
    IconFieldModule,
    InputIconModule,
    ButtonModule,
    PaginatorModule
  ],
  providers: [
    DatePipe
  ],
  templateUrl: './datatable.component.html',
  styleUrl: './datatable.component.scss'
})
export class DatatableComponent {

  selectedItem: any;
  _filter: string = "";

  @Input() config: DataTable = new DataTable();
  @Input() showPagination: boolean = true;
  @Input() dataKey: string = "";
  @Output() onPageChange: EventEmitter<any> = new EventEmitter();
  @Output() onSelectedRegister: EventEmitter<any> = new EventEmitter();

  constructor(
    private datePipe: DatePipe
  ){
  }

  onRefreshData(){
    this.onPageChange.emit(new RequestData());
  }

  pageChange($event: PaginatorState) {
    var data = new RequestData();
    data.size = $event.rows;
    data.offset = $event.page ? $event.page + 1 : 1;
    this.onPageChange.emit(data);
  }

  onRowData(row: any, header: string, col: any){
    const keys = header.split(".");
    let value = keys.reduce((obj, key) => (obj && obj[key] !== undefined ? obj[key] : null), row);
    return this.onCustomValue(value,col);
  }

  onCustomValue(value: any, col: any): any{
    if(col.customValue){
      switch (col.customValue){
        case "MONEY":
          value = parseFloat(value).toFixed(2);
          break;
        case "DATE":
          value = this.datePipe.transform(value, 'dd/MM/yyyy')!;
          break;
        default:
          break;
      }
    }
    return value
  }

  onSelection(item: any){
    this.onSelectedRegister.emit(item.data);
  }

  onChangeInputFilter(){
    var data = new RequestData();
    data.filter = `nome like '%${this._filter}%' `;
    this.onPageChange.emit(data);
  }

}
