import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConverterService {

  constructor() { }


  onConvertBatchShippingPerson(persons: any[]): any[] {
    const batchPerson = structuredClone(persons);

    batchPerson.forEach((person: any) => {
      person["NOME"] = person.nome;
      person["FONE_CELULAR"] = person.Fone;
    })

    return batchPerson;
  }

  onConvertBatchShippingProduct(product: any[]): any[] {
    const batchProduct = structuredClone(product);

    batchProduct.forEach((item: any) => {
      item["DESCRICAO"] = item["DESCRIÇÃO"];
    })

    return batchProduct;
  }
}
