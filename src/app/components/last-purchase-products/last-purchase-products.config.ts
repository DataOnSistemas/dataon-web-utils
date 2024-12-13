import {Column} from "../../shared/components/datatable/datatable/datatable";

export class LastPurchaseProducts {

  datatatableConfig: Column[] = [
    {
      field: "Descricao",
      header: "Descrição",
      width: "55%",
      customValue: ""
    },
    {
      field: "quantidade",
      header: "Quantidade",
      width: "15%",
      customValue: "MONEY"
    },
    {
      field: "Desconto",
      header: "Desconto",
      width: "15%",
      customValue: "MONEY"
    },
    {
      field: "valorTotal",
      header: "Valor Total",
      width: "15%",
      customValue: "MONEY"
    }
  ];
}
