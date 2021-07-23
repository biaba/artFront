import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from '@environments/environment';
import { User, Smallimage } from '@app/_models';
import { Observable, BehaviorSubject } from 'rxjs';
import { AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { map, tap } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';

@Injectable({ providedIn: 'root' })
export class UserService {

    // logged in user
    theUser: User;

    sArtist: BehaviorSubject<User[]> = new BehaviorSubject([]);
    sMessage: BehaviorSubject<string> = new BehaviorSubject('');

    constructor(
        private auth: AuthenticationService,
        private http: HttpClient) {
        this.auth.currentUser.subscribe(user => this.theUser = user);
        this.sArtist = new BehaviorSubject<User[]>(JSON.parse(localStorage.getItem('artistProfile')));
    }

    checkIfFavourite(theImage: Smallimage) {
        if (this.theUser) {
            const params = new HttpParams()
                .set('username', this.theUser.username)
                .set('id', theImage.id.toString());
            return this.http.get<boolean>(`${environment.apiUrl}/check/image/favourite`, { params });
        }
    }

    addImageToFavourites(theId: number) {
        const params = new HttpParams()
            .set('username', this.theUser.username)
            .set('id', theId.toString());
        return this.http.get<any>(`${environment.apiUrl}/add/image/favourite`, { params });
    }

    removeImageFromFavourites(theId: number) {
        const params = new HttpParams()
            .set('username', this.theUser.username)
            .set('id', theId.toString());
        return this.http.get<any>(`${environment.apiUrl}/remove/image/favourite`, { params });
    }

    getAll(): Observable<User[]> {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    setNewValues(theArtist: User) {
        let temp;
        temp = theArtist;
        this.sArtist.next(temp);
        localStorage.setItem('artistProfile', JSON.stringify(theArtist));

    }

    getUserDetails(theArtist?: string): Observable<User> {
        this.sArtist.next([]);
        this.sMessage.next('');
        if (theArtist) {
            const params = new HttpParams().set('artist', theArtist);
            return this.http.get<any>(`${environment.apiUrl}/user`, { params }).pipe(tap(artist => {
                this.setNewValues(artist);

            }));
        } else {
            return this.http.get<any>(`${environment.apiUrl}/user`).pipe(tap(user => {
                this.setNewValues(user);
            }));
        }
    }

    checkIfUsernameExists(theUsername: string): Observable<boolean> {
        const params = new HttpParams().set('username', theUsername);
        return this.http.get<boolean>(`${environment.apiUrl}/check/username`, { params });
    }

    usernameValidator(): AsyncValidatorFn {
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
            return this.checkIfUsernameExists(control.value).pipe(
                map(res => {
                    // if res is true, username exists and no error, otherwise search error
                    return res ? null : { usernameNotExists: true };
                    // NB: Return null if there is no error
                })
            );
        };
    }
}
