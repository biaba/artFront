import { Component } from '@angular/core';
import { RestService } from '@app/_services';
import { Router } from '@angular/router';

class Department {
  departmentId: number;
  displayName: string;

}

@Component({
  selector: 'app-rest',
  templateUrl: './rest.component.html'
})
export class RestComponent {

  deps: Department[];
  theDep = 0;

  constructor(
    private rest: RestService,
    private router: Router
  ) { }

  getDepartments() {
    this.rest.getDeps().subscribe(dep => this.deps = dep.departments);
  }

  onSelect(theId: number) {
    this.theDep = theId;
  }

  searchIds(event: any) {
    if (this.theDep > 0) {
      this.rest.getIds(event.target.value, this.theDep).subscribe(() => {
        this.router.navigate(['artList']);
      });
    } else {
      this.rest.getIds(event.target.value).subscribe(() => {
        this.router.navigate(['artList']);
      });
    }

  }

}

