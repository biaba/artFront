import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, } from '@angular/router';
import { SearchService } from './search.service';
import { delay } from 'rxjs/operators';
import { forkJoin, Observable } from 'rxjs';
import { UserService } from './user.service';
import { Criteria } from '@app/search';

@Injectable({
  providedIn: 'root'
})
export class ProfileResolverService implements Resolve<any> {

  constructor(
    private searchService: SearchService,
    private userService: UserService) { }

  public multiSources(criteria: Criteria, username: string): Observable<any[]> {
    console.log('PRE RESOLVER ');
    const images = this.searchService.searchImages(criteria);
    const user = this.userService.getUserDetails(username);

    return forkJoin([images, user]);
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any[]> {
    const username = route.paramMap.get('theArtist');
    const criteria: Criteria = { artist: username };

    console.log('in RESOLVER ');

    return this.multiSources(criteria, username).pipe(delay(2000));
  }

}
