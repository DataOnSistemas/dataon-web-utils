import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs";
import {CookieService} from "ngx-cookie-service";
import {EnumCookie} from "../shared/services/cookies/cookie.enum";

@Injectable({
  providedIn: 'root'
})
export class WhatsappService {

  constructor(
    private readonly http: HttpClient,
    private readonly cookieService: CookieService
  ) { }

  public sendMessage(message: string, number: string, planos: any) : Observable<any> {
    return this.http.post(`dataOn/doWhats/sendText?doID=${this.cookieService.get(EnumCookie.DOID)}&doIDUser=-100&message=${message}&number=${number}`,planos);
  }

  public htmlToTextWhats(message: string) : string {

    const tagWhiteSpace = /(>|$)(\W|\n|\r)+</g;
    const stripFormatting = /<[^>]*(>|$)/g;
    const lineBreak = /<(br|BR)\s*\/?>/g;

    let text = message;

    text = this.decodeHtmlEntities(text);

    text = text.replace(tagWhiteSpace, '><');

    text = text.replace(lineBreak, '\n');

    text = text.replace(stripFormatting, '');

    return text;

  }

  private decodeHtmlEntities(html: string): string {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = html;
    return textArea.value;
  }
}
