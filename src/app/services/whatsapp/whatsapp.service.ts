import { Injectable} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {lastValueFrom, Observable, Subject} from "rxjs";
import {CookieService} from "ngx-cookie-service";
import {EnumCookie} from "../../shared/services/cookies/cookie.enum";
import {LoadingService} from "../../shared/services/loading/loading.service";
import {generateUUIDv4} from "../../shared/common/functions-utils";
import {BatchShipping} from "../../interfaces/batch-shipping";



export interface IBathMessages {
  id: string;
  name: string;
  fone: string;
  plano?: any;
  message: string;
  origin: string;
}

@Injectable({
  providedIn: 'root'
})
export class WhatsappService {

  private messages: IBathMessages[] = [];
  public logs: any[] = [];


  constructor(
    private readonly http: HttpClient,
    private readonly cookieService: CookieService,
    private readonly loadingService: LoadingService,

  ) {}


  updateVariable(message: IBathMessages) {
    this.messages.push(message);
  }


  public async batch(hash: string, dispatch: boolean, plano: any){
    this.loadingService.processing.next(true);
    let cloneMessages = structuredClone(this.messages);
    for (const message of cloneMessages) {
      const data = await lastValueFrom(this.sendMessage(message.message, message.fone, plano));
      if (data.RetWm === 'success') {
        this.messages = this.messages.filter(item => item.id !== message.id);
      }
      const log = {
        id: generateUUIDv4(),
        status: data.RetWm,
        origin: message.origin,
        name: message.name,
      }
      this.logs.push(log);
      sessionStorage.setItem("logs", JSON.stringify(this.logs));
    }
    this.loadingService.processing.next(false);
  }

  public sendMessage(message: string, number: string, planos: any) : Observable<any> {
    const encodedMessage = encodeURIComponent(message);
    return this.http.post(`dataOn/doWhats/sendText?doID=${this.cookieService.get(EnumCookie.DOID)}&doIDUser=-100&message=${encodedMessage}&number=${number}`,planos);
  }


  public htmlToTextWhats(message: string) : string {

    const tagWhiteSpace = /(>|$)(\W|\r)+</g;
    const stripFormatting = /<[^>]*(>|$)/g;
    const lineBreak = /<(br|BR)\s*\/?>/g;


    let text = message;

    text = this.decodeHtmlEntities(text);

    //text = text.replace(tagWhiteSpace, '><');

    text = text.replace(lineBreak, '\n');

    text = text.replace(stripFormatting, '');

    text = text.replace(/\n\s*\n/g, '\n\n');

    text = text.trim();

    return text;

  }

  private decodeHtmlEntities(html: string): string {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = html;
    return textArea.value;
  }

  onReplaceVariable(message: string, person: any, complany?: any, batchShipping?: BatchShipping | null): string{

    message = message.replace("vetClienteNome",person["NOME"] || person["Nome"]);

    if(batchShipping){
      let products = "";
      batchShipping.products.forEach(item => {
        products += `${item["Descricao"]}\n`;
      })
      message = message.replace("vetProdutosPromocoes",products) ;
    }
    return message;
  }
}
