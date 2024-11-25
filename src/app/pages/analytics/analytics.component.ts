import {Component, OnInit} from '@angular/core';
import {BaseComponent} from "../../shared/components/inputs/base-component";
import {SharedCommonModule} from "../../shared/common/shared-common.module";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [
    SharedCommonModule
  ],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.scss'
})
export class AnalyticsComponent extends  BaseComponent implements OnInit {

  doToken: string | null = null;
  doID: string | null = null;

  constructor(private route: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.doToken = params['doToken']; // Obtém o valor do parâmetro `token`
      this.doID = params['doID']; // Obtém o valor do parâmetro `ID`
    });
  }

}
