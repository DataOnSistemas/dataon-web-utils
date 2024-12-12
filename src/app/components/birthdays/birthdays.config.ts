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

  onConvertBatchShipping(persons: any[]): any[] {
    const batchPerson = structuredClone(persons);

    batchPerson.forEach((person: any) => {
      person["NOME"] = person.nome;
      person["FONE_CELULAR"] = person.Fone;
    })

    return batchPerson;
  }
}
