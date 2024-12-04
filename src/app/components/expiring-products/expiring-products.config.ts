import {Column} from "../../shared/components/datatable/datatable/datatable";

export class ExpiringProductsConfig {

  datatatableConfig: Column[] = [
    {
      field: "Produto",
      header: "Produto",
      width: "60%",
      customValue: ""
    },
    {
      field: "total",
      header: "Total",
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
}
