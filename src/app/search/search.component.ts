
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { User, Smallimage } from '@app/_models';
import { UserService } from '@app/_services';
import { Router } from '@angular/router';
import { SearchService } from '@app/_services/search.service';


export interface Criteria {
  artist?: string;
  artName?: string;
  category?: string;
  forSale?: boolean;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})

export class SearchComponent implements OnInit {

  loading = false;
  users: User[];
  images: Smallimage[];
  searchForm = this.fb.group({
    artist: ['', [Validators.required], [this.userService.usernameValidator()]],
    artName: ['', [Validators.required], [this.searchService.imagenameValidator()]],
    category: [''],
    forSale: ['']
  });
  categories = ['', 'PAINTING', 'DRAWING', 'SCULPTURE', 'CERAMICS', 'PHOTOGRAPHY', 'CRAFTS'];
  forSales = [
    { display: '', value: '' },
    { display: 'Yes', value: 'true' },
    { display: 'No', value: 'false' }
  ];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private searchService: SearchService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.userService.getAll().subscribe(users => {
      this.loading = false;
      this.users = users;
    });
  }

  public onSearch() {
    const criteria: Criteria = {};
    if (this.searchForm.get('artist').value !== '') {
      criteria.artist = this.searchForm.get('artist').value;
    }
    if (this.searchForm.get('artName').value !== '') {
      criteria.artName = this.searchForm.get('artName').value;
    }
    if (this.searchForm.get('forSale').value !== '') {
      criteria.forSale = this.searchForm.get('forSale').value;
    }
    if (this.searchForm.get('category').value !== '') {
      criteria.category = this.searchForm.get('category').value;
    }
    // console.log(criteria.artist + ' ' + criteria.artName + ' ' + criteria.forSale + ' ' + criteria.category);

    this.searchService.searchImages(criteria).subscribe(() => {
      this.router.navigate(['presentArtList']);
    });

  }

}
