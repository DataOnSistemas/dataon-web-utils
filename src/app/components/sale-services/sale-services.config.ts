import {Column} from "../../shared/components/datatable/datatable/datatable";

export class SaleServicesConfig {

  datatatableConfig: Column[] = [
    {
      field: "Descricao",
      header: "Descrição",
      width: "70%",
      customValue: ""
    },
    {
      field: "QuantidadeJaVendida",
      header: "Quantidaade vendida",
      width: "10%",
      customValue: ""
    },
    {
      field: "UltimaVenda",
      header: "Ultima Venda",
      width: "20%",
      customValue: "DATE"
    }
  ];
}
