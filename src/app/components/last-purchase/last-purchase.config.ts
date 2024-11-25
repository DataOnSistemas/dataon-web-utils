import {Column, DataTable} from "../../shared/components/datatable/datatable/datatable";

export class LastPurchaseConfig{

  datatatableConfig: Column[] = [
    {
      field: "nome",
      header: "Nome",
      width: "80%",
      customValue: ""
    },
    {
      field: "UltimaCompra",
      header: "Ultima Compra",
      width: "20%",
      customValue: "DATE"
    }
  ];
}
