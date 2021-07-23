import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import * as env from '@environments/environment';

class SearchResult {
  total: number;
  objectIDs: number[];
}

@Injectable({
  providedIn: 'root'
})
export class RestService {

  tempImages = [];
  searchIDs = {
    total: 0,
    objectIDs: [0]
  };
  sImages: BehaviorSubject<any[]> = new BehaviorSubject([]);
  sMessage: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(private http: HttpClient) {
    this.sImages = new BehaviorSubject<any[]>(JSON.parse(localStorage.getItem('restImages')));
    this.sMessage = new BehaviorSubject<string>(localStorage.getItem('restMessage'));
    this.searchIDs = JSON.parse(localStorage.getItem('searchIDs'));
  }

  getDeps(): Observable<any> {
    return this.http.get(`${env.departmentUrl}`);
  }

  getIds(theTerm: string, theDep?: number) {
    this.tempImages = [];
    this.sImages.next([]);
    this.sMessage.next('');
    this.searchIDs = {
      total: 0,
      objectIDs: [0]
    };
    const searchUrl = theDep !== undefined ? `${env.searchTermAndDepUrl(theTerm, theDep)}` : `${env.searchTermUrl(theTerm)}`;
    return this.http
      .get<SearchResult>(searchUrl)
      .pipe(map(result => {
        this.searchIDs = result;
        localStorage.setItem('searchIDs', JSON.stringify(this.searchIDs));
        if (this.searchIDs.total === 0) {
          this.sMessage.next('No results');
          localStorage.setItem('restMessage', this.sMessage.value);
          return;
        }
        if (this.searchIDs.objectIDs.length > 20) {
          this.sMessage.next('Your search returned more than 20 results. Here are the top 20');
          localStorage.setItem('restMessage', this.sMessage.value);
        }
        for (let i = 0; i < this.searchIDs.objectIDs.length && i < 20; i++) {
          this.getImage(this.searchIDs.objectIDs[i]).subscribe();
        }

        this.sImages.next(this.tempImages);

      }));
  }

  getImage(id: number): Observable<any> {
    return this.http.get(`${env.searchArtItemUrl(id)}`).pipe(map(image => {
      this.tempImages.push(image);
      if (this.searchIDs.objectIDs.length === this.tempImages.length || this.tempImages.length === 20) {


        localStorage.setItem('restImages', JSON.stringify(this.tempImages));
      }
    }));

  }
}
