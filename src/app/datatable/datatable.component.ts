import { Component, OnInit } from '@angular/core';
import { Report } from '../../report';
import { REPORTS } from '../../reports-mock';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css']
})
export class DatatableComponent implements OnInit {

  reports: Report[] = [];

  constructor() { }

  ngOnInit(): void {
    this.getReports();
  }

  getReports(): void {
    // this.heroService.getHeroes()
    //     .subscribe(heroes => this.heroes = heroes);
    this.reports = REPORTS;
  }

}
