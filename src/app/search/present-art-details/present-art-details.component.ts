import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { SearchService, UserService, AuthenticationService } from '@app/_services';
import * as env from '@environments/environment';
import { User } from '@app/_models';
import { Criteria } from '../search.component';

@Component({
  selector: 'app-present-art-details',
  templateUrl: './present-art-details.component.html',
  styleUrls: ['./present-art-details.component.css']
})
export class PresentArtDetailsComponent implements OnInit {

  // logged in user
  theUser: User;
  isFavourite: boolean;
  image = [];
  theId: number;
  localFileSystem = `${env.localFileSystem}`;

  constructor(
    private auth: AuthenticationService,
    private aRoute: ActivatedRoute,
    private router: Router,
    private searchService: SearchService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.auth.currentUser.subscribe(user => this.theUser = user);
    this.theId = +this.aRoute.snapshot.paramMap.get('id');
    this.searchService.sImages.subscribe(data => this.image = data);
    this.image = this.searchService.sImages.getValue();
    if (this.theUser) {
      this.userService.checkIfFavourite(this.image[this.theId]).subscribe(is => this.isFavourite = is);
    }
  }

  lookUpArtist() {
    const artist = this.image[this.theId].creator.username;
    this.userlookUp(artist);
  }

  lookUpBuyer() {
    const buyer = this.image[this.theId].buyer.username;
    this.userlookUp(buyer);
  }

  userlookUp(user: string) {
    this.router.navigate(['/artistProfile', { theArtist: user }]);
  }

  removeOrAdd() {
    if (this.isFavourite) {
      this.userService.removeImageFromFavourites(this.image[this.theId].id).subscribe(
        done => { if (done) { this.isFavourite = false; } });
    } else {
      this.userService.addImageToFavourites(this.image[this.theId].id).subscribe(
        done => { if (done) { this.isFavourite = true; } });
    }
  }

  buy() {
    this.router.navigate(['payment']);
  }

}

