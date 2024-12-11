import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpHeaders, HttpRequest } from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {CookiesService} from "../../shared/services/cookies/cookies.service";
import {Router} from "@angular/router";
import {inject} from "@angular/core";
import {EnumCookie} from "../../shared/services/cookies/cookie.enum";
import {environment} from "../../../environments/environment";

export function authInterceptor(originalRequest: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    const cookiesService = inject(CookiesService);
    const router = inject(Router);


    let request: HttpRequest<unknown>;

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', environment.basicAuth);
    headers = headers.set(EnumCookie.DOTOKEN, cookiesService.get(EnumCookie.DOTOKEN));


    request = originalRequest.clone({
        headers: headers,
        url: `${environment.apiUrl}/${originalRequest.url}`,
    });

    return next(request).pipe(
        catchError((error: HttpErrorResponse) => {

            if(error.status === 401 || error.status === 0){
              //cookiesService.delete(EnumCookie.AUTHORIZATION);
              //router.navigate(['login']);
            }

            return throwError(() => {
            });
          })
    );
}
