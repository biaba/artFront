import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@environments/environment';
import { AuthenticationService } from '@app/_services';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {

    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (request.url.startsWith(`${environment.apiUrl}`)) {
            // add authorization header with basic auth credentials if available
            const currentUser = this.authenticationService.currentUserValue;
            if (currentUser && currentUser.authdata) {
                request = request.clone({
                    setHeaders: {
                        Authorization: `Basic ${currentUser.authdata}`
                    }
                });
            }
            console.log(currentUser + ' in AuthInterceptor');
        }
        return next.handle(request);
    }
}


