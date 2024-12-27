import {Column, DataTable} from "../../shared/components/datatable/datatable/datatable";

export class SaleServicesConfig {


  datatableConsumers: DataTable = new DataTable();

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

  datatatableConsumerColumns: Column[] = [
    {
      field: "nome",
      header: "Nome",
      width: "70%",
      customValue: ""
    },
    {
      field: "quantidade",
      header: "Quantidaade ja comprada",
      width: "10%",
      customValue: ""
    },
    {
      field: "ultimacompra",
      header: "Ultima compra",
      width: "20%",
      customValue: "DATE"
    }
  ];
}
