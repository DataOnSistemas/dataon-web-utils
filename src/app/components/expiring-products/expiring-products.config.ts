import {Column} from "../../shared/components/datatable/datatable/datatable";

export class ExpiringProductsConfig {

  datatatableConfig: Column[] = [
    {
      field: "Descricao",
      header: "Descricao",
      width: "60%",
      customValue: ""
    },
    {
      field: "Quantidade",
      header: "Quantidade",
      width: "10%",
      customValue: ""
    },
    {
      field: "Lote",
      header: "Lote",
      width: "10%",
      customValue: ""
    },
    {
      field: "Validade",
      header: "Validade",
      width: "20%",
      customValue: "DATE"
    }
  ];

  filterFields: any[] = [
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
}
