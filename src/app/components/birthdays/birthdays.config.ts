import {Column} from "../../shared/components/datatable/datatable/datatable";

export class BirthdaysConfig {

  datatatableConfig: Column[] = [
    {
      field: "nome",
      header: "Nome",
      width: "80%",
      customValue: ""
    },
    {
      field: "DataNascimento",
      header: "Data nascimento",
      width: "20%",
      customValue: "DATE"
    }
  ];

}
