import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { RestService } from '@app/_services';

@Component({
  selector: 'app-art-details',
  templateUrl: './art-details.component.html',
  styleUrls: ['./art-details.component.css']
})
export class ArtDetailsComponent implements OnInit {

  image = [];
  theId: number;

  constructor(
    private aRoute: ActivatedRoute,
    private rest: RestService
  ) { }

  ngOnInit() {
    this.theId = +this.aRoute.snapshot.paramMap.get('id');
    this.rest.sImages.subscribe(data => this.image = data);
  }

}
