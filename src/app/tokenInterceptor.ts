import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
  API_TOKEN: string;
  constructor() {

  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (localStorage.getItem('myTodo')) {
      this.API_TOKEN = JSON.parse(localStorage.getItem('myTodo')).user.token;
    } else {
      this.API_TOKEN = '';
    }
    // console.log(this.API_TOKEN);
    const tokenizedReq = req.clone({
      setHeaders: {
        // tslint:disable-next-line:max-line-length
        Authorization: this.API_TOKEN ? `Token ${this.API_TOKEN}` : ''
      }
    });
    return next.handle(tokenizedReq);
  }
}
