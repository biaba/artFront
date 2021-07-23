import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from '@app/_services/search.service';
import * as env from '@environments/environment';
import { UserService, AuthenticationService } from '@app/_services';
import { User } from '@app/_models';

@Component({
  selector: 'app-present-art-list',
  templateUrl: './present-art-list.component.html',
  styleUrls: ['./present-art-list.component.css']
})
export class PresentArtListComponent implements OnInit {

  // logged in user
  theUser: User;
  map = new Map<number, boolean>();
  images = [];
  message = '';
  localFileSystem = `${env.localFileSystem}`;

  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private searchService: SearchService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.searchService.sImages.subscribe({
      next: data => this.images = data,
      complete: () => {
        if (this.theUser) { this.checkIfFavourites(); }
      }
    });
    this.searchService.sImages.complete();
    this.images = this.searchService.sImages.getValue();

    this.searchService.sMessage.subscribe(mssg => this.message = mssg);
    this.auth.currentUser.subscribe(user => this.theUser = user);

  }

  checkIfFavourites() {
    for (const i of this.images) {
      this.userService.checkIfFavourite(i.id).subscribe(is => this.map.set(this.images.indexOf(i), is));
    }
  }

  lookUpDetails(theId: number) {
    this.router.navigate(['presentArtDetails', { id: theId }]);
  }

  isFavourite(index: number): boolean {
    return this.map.get(index);
  }

  removeOrAdd(index: number) {
    if (this.map.get(index)) {
      this.userService.removeImageFromFavourites(this.images[index].id).subscribe(
        is => { if (is) { this.map.set(index, false); } });
    } else {
      this.userService.addImageToFavourites(this.images[index].id).subscribe(
        is => { if (is) { this.map.set(index, true); } });
    }
  }

}
