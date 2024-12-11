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
      required: false,
      hidden: false,
      type: 'string'
    },
    {
      fieldName: 'number',
      required: false,
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

  onLoadFilter(filterFormGroup: FormGroup): string {
    let stringFilter: string = "";
    if(filterFormGroup.get("ativo")?.value && filterFormGroup.get("ativo")?.value["key"] > -1){ //f27
      stringFilter += ` AND (Pessoas_clientes.Inativo = ${filterFormGroup.get("ativo")?.value["key"]}) `
    }
    if(filterFormGroup.get("classificacao")?.value){ // f31
      stringFilter += ` AND Pessoas_clientes.IDClassificacao = ${filterFormGroup.get("classificacao")?.value["ID"]}`
    }
    let anmaisinativos = filterFormGroup.get("animaisinativos")?.value;
    if(anmaisinativos && anmaisinativos["key"] !== 1){ //f42
      stringFilter += ` AND Pessoas.ID IN (SELECT DISTINCT pessoas.ID FROM pessoas LEFT JOIN vet_animais a ON pessoas.ID = a.IDDono WHERE a.ID IS NULL OR (a.Inativo = 1 AND a.Obito = 1) OR pessoas.ID IN ( SELECT IDDono FROM vet_animais GROUP BY IDDono HAVING SUM(CASE WHEN Inativo = 1 OR Obito = 1 THEN 1 ELSE 0 END) < COUNT(ID))) `
    }
    if(filterFormGroup.get("cidade")?.value){ //f33
      stringFilter += ` AND (select cidades.id from pessoas_enderecos INNER JOIN cidades ON pessoas_enderecos.IDCidade = cidades.ID where pessoas_enderecos.Tipo = 0 and pessoas_enderecos.IDPessoa = pessoas.id) = ${filterFormGroup.get("cidade")?.value["ID"]}`
    }
    if(filterFormGroup.get("estado")?.value){ //f34
      stringFilter += `  AND (SELECT estados.Sigla FROM pessoas_enderecos INNER JOIN cidades ON pessoas_enderecos.IDCidade = cidades.ID INNER JOIN estados ON cidades.IDEstado = estados.ID WHERE(pessoas_enderecos.Tipo = 0) AND(pessoas_enderecos.IDPessoa = pessoas.id)) = '${filterFormGroup.get("estado")?.value["SIGLA"]}'`
    }
    if(filterFormGroup.get("vendasperiodo")?.value){ //f36
      let value = filterFormGroup.get("vendasperiodo")?.value;
      if(value["key"] === 2){
        //stringFilter += `AND (Pessoas.DataCadastro between CONVERT(DATETIME, `
      }
    }
    if(filterFormGroup.get("produto")?.value){ //f32

    }
    if(filterFormGroup.get("grupo")?.value){//f37

    }
    if(filterFormGroup.get("marca")?.value){//f40

    }
    if(filterFormGroup.get("clientesque")?.value){//f38

    }
    if(filterFormGroup.get("comfaturamento")?.value){ //f39

    }
    const de = filterFormGroup.get("de")?.value;//f29
    const ate = filterFormGroup.get("ate")?.value;// f30
    if(de && ate){

    }

    return stringFilter;
  }

  convertToDTO(formGroup: FormGroup): any {
    let dto = {
      messageModel: formGroup.get('messageModel')?.value,
      name: formGroup.get('name')?.value,
      number: formGroup.get('number')?.value,
      message: formGroup.get('message')?.value
    };
    return dto;
  }
}
