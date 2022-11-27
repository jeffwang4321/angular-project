import { Component, OnInit } from '@angular/core';
import { Report } from '../interface';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css']
})
export class DatatableComponent implements OnInit {
  reports: Report[] = [];
  apiURL =
    'https://272.selfip.net/apps/E1uq9AFJb3/collections/reports/documents/';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getReports();
  }

  getReports(): void {
    this.http.get<Report[]>(this.apiURL).subscribe({
      next: (data) => {
        this.convertData(data);
      },
      error: (error) => {
        console.log('Error:', error);
      },
    });
  }

  convertData(reports: any): void {
    // console.log(reports);
    (Object.keys(reports) as (keyof typeof reports)[]).forEach((key) => {
      let obj = reports[key];
      const data = 'data' as keyof typeof obj;
      this.reports.push(obj[data]);
    });
    // console.log(this.reports);
  }
}
