import { Component, OnInit } from '@angular/core';

import { SearchService, UserService, AuthenticationService } from '@app/_services';
import * as env from '@environments/environment';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { User } from '@app/_models';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  // logged in user
  theUser: User;
  isFavourite: boolean;

  // looked at user - own or another
  theUserName = '';
  user: any;

  images = [];
  message = '';

  localFileSystem = `${env.localFileSystem}`;


  constructor(
    private aRoute: ActivatedRoute,
    private auth: AuthenticationService,
    private router: Router,
    private searchService: SearchService,
    private userService: UserService) { }


  ngOnInit() {
    this.aRoute.data.subscribe((data: { images: any }) => {
      console.log('in PROFILE ' + JSON.stringify(data))
      this.images = data.images[0];
      this.user = data.images[1];
    });
    this.searchService.sImages.subscribe(data => this.images = data);
    this.auth.currentUser.subscribe(user => this.theUser = user);
    this.userService.sArtist.subscribe(artist => this.user = artist);
    this.searchService.sMessage.subscribe(mssg => this.message = mssg);
  }

  lookUpDetails(theId: number) {
    this.router.navigate(['presentArtDetails', { id: theId }]);
  }

}
