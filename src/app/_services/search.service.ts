import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Criteria } from '@app/search';
import { environment } from '@environments/environment';
import { map, tap } from 'rxjs/operators';
import { AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  public sImages: BehaviorSubject<any[]> = new BehaviorSubject([]);
  public sMessage: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(private http: HttpClient) {
    this.sImages = new BehaviorSubject<any[]>(JSON.parse(localStorage.getItem('images')));
    this.sMessage = new BehaviorSubject<string>(localStorage.getItem('searchMessage'));
  }

  searchImages(criteria: Criteria): Observable<any[]> {
    this.sImages.next([]);
    this.sMessage.next('');
    return this.http.post<any>(`${environment.apiUrl}/advancedSearch`, criteria).pipe(tap(images => {
      if (images.length === 0) {
        this.sMessage.next('No results');
        localStorage.setItem('searchMessage', this.sMessage.value);
        localStorage.removeItem('images');
      } else {
        this.sImages.next(images);
        localStorage.setItem('images', JSON.stringify(images));
      }
    }));
  }

  checkIfImagenameExists(imageName: string): Observable<boolean> {
    const params = new HttpParams().set('artname', imageName);
    return this.http.get<boolean>(`${environment.apiUrl}/check/artname`, { params });
  }

  imagenameValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.checkIfImagenameExists(control.value).pipe(
        map(res => {
          // if res is true, artname exists and no error, otherwise search error
          return res ? null : { imagenameNotExists: true };
        })
      );
    };
  }
}
