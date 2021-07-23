import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, UserService, SearchService } from '@app/_services';
import { User } from '@app/_models';
import { Criteria } from './search';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  theUser: User;

  constructor(
    private auth: AuthenticationService,
    private searchService: SearchService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    this.auth.currentUser.subscribe(user => this.theUser = user);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }

  userDetails() {
    this.router.navigate(['/profile', { theArtist: this.theUser.username }]);
  }
}

