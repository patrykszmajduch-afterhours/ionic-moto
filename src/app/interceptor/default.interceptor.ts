import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders
} from '@angular/common/http';
import { AuthService } from '../auth/auth.service';


@Injectable()
export class DefaultInterceptor implements HttpInterceptor {

    constructor(private auth: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        // Get the auth token from the service.
        // const authToken = this.auth.getAuthorizationToken();
        const apiUrl = 'http://otomoto-backend.azurewebsites.net/api/';
        // const httpRequest = new HttpRequest(<any>req.method, apiUrl + req.url);
        // req = Object.assign(req, httpRequest);
        // const authReq = req.clone({
        //     headers: new Headers(headerDict)
        // });
        // http://otomoto-backend.azurewebsites.net/api/Advertisement/Collection

        const test = req.clone({
            url: apiUrl + req.url,
            setHeaders: {
                // 'App-version2': 'auth interceptor', 
                // // 'Origin': 'http://localhost:8100',
                // "Access-Control-Allow-Methods": "POST, PUT, GET, OPTIONS, DELETE",
                // "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With,observe"
            }
        });
        //     test.setHeader("Access-Control-Allow-Origin", "*");
        //   response.setHeader("Access-Control-Allow-Methods", "POST, PUT, GET, OPTIONS, DELETE");
        //   response.setHeader("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With,observe");
        //   response.setHeader("Access-Control-Max-Age", "3600");
        //   response.setHeader("Access-Control-Allow-Credentials", "true");
        //   response.setHeader("Access-Control-Expose-Headers", "Authorization");
        //   response.addHeader("Access-Control-Expose-Headers", "responseType");
        //   response.addHeader("Access-Control-Expose-Headers", "observe");
        // send cloned request with header to the next handler.
        return next.handle(test);
    }
}