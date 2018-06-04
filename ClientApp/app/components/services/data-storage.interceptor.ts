import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable' 
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class DataStorageInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const copiedReq = req.clone({
            headers: req.headers.set('Authorization', 'Bearer ' + this.authService.getToken())
        });
        return next.handle(copiedReq);
    }
}