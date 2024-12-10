import {DynamicQuery} from "../../services/dynamic-query/dynamic-query"
import {CookiesService} from "../../shared/services/cookies/cookies.service";
import {EnumCookie} from "../../shared/services/cookies/cookie.enum";
import {FormGroup} from "@angular/forms";

export class BatchShippingConfig {

  constructor(private readonly coockieService: CookiesService) {
    this.onLoadDynamiqConfig();
  }

  fields: any[] = [
    {
      fieldName: 'messageModel',
      required: true,
      hidden: false,
      type: 'string'
    },
    {
      fieldName: 'name',
      required: true,
      hidden: false,
      type: 'string'
    },
    {
      fieldName: 'number',
      required: true,
      hidden: false,
      type: 'string'
    },
    {
      fieldName: 'message',
      required: true,
      hidden: false,
      type: 'string'
    },
  ]

  filterFields: any[] = [
    {
      fieldName: 'ativo',
      required: true,
      hidden: false,
      type: 'string'
    },
    {
      fieldName: 'classificacao',
      required: true,
      hidden: false,
      type: 'string'
    },
    {
      fieldName: 'animaisinativos',
      required: true,
      hidden: false,
      type: 'string'
    },
    {
      fieldName: 'cidade',
      required: true,
      hidden: false,
      type: 'string'
    },
    {
      fieldName: 'estado',
      required: true,
      hidden: false,
      type: 'string'
    },
    {
      fieldName: 'vendasperiodo',
      required: true,
      hidden: false,
      type: 'string'
    },
    {
      fieldName: 'produto',
      required: true,
      hidden: false,
      type: 'string'
    },
    {
      fieldName: 'grupo',
      required: true,
      hidden: false,
      type: 'string'
    },
    {
      fieldName: 'marca',
      required: true,
      hidden: false,
      type: 'string'
    },
    {
      fieldName: 'clientesque',
      required: true,
      hidden: false,
      type: 'string'
    },
    {
      fieldName: 'comfaturamento',
      required: true,
      hidden: false,
      type: 'string'
    },
    {
      fieldName: 'de',
      required: true,
      hidden: false,
      type: 'string'
    },
    {
      fieldName: 'ate',
      required: true,
      hidden: false,
      type: 'string'
    },
  ]

  dynamicQuery: DynamicQuery = new DynamicQuery();


  onLoadDynamiqConfig() {
    this.dynamicQuery.limit = 20;
    this.dynamicQuery.page = 1;
    this.dynamicQuery.type = 0;
    this.dynamicQuery.route = "mnuCadastros_mnuClientes_mnuCadastro";
    this.dynamicQuery.doID = parseInt(this.coockieService.get(EnumCookie.DOID));
    this.dynamicQuery.filter = ` `
    this.dynamicQuery.extraCritSQL = " AND (Pessoas_clientes.Inativo = 0) "
  }

  onLoadFilter(filterFormGroup: FormGroup) {
    if(filterFormGroup.get("ativo")){

    }
  }
}
