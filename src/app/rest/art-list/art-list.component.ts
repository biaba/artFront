import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from '@app/_services';

@Component({
  selector: 'app-art-list',
  templateUrl: './art-list.component.html',
  styleUrls: ['./art-list.component.css']
})
export class ArtListComponent implements OnInit {

  images = [];
  message = '';

  constructor(
    private rest: RestService,
    private router: Router
  ) { }

  ngOnInit() {
    this.rest.sImages.subscribe(data => this.images = data);
    this.rest.sMessage.subscribe(mssg => this.message = mssg);
  }

  goToDetails(theId: number) {
    this.router.navigate(['artDetails', { id: theId }]);
  }

}
