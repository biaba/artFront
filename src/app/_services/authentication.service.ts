import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { username, password }, { observe: 'response' })
            .pipe(map(resp => {

                console.log(resp.headers.keys());

                // store user details and basic auth credentials in session storage to keep user logged in between page refreshes
                resp.body.authdata = window.btoa(username + ':' + password);
                sessionStorage.setItem('currentUser', JSON.stringify(resp.body));
                console.log('hi: ' + JSON.stringify(resp.body));
                this.currentUserSubject.next(resp.body);
                return resp.body;
            }));
    }

    logout() {
        // remove user from session storage to log user out
        sessionStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

}
