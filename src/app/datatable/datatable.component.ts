import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Report } from '../interface';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css'],
})
export class DatatableComponent implements OnInit {
  reports: Report[] = [];
  apiURL = 'https://272.selfip.net/apps/E1uq9AFJb3/collections/';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getReports();
  }

  getReports(): void {
    this.http.get<Report[]>(this.apiURL + 'reports/documents/').subscribe({
      next: (data) => {
        this.convertData(data);
      },
      error: (error) => {
        console.log('Error:', error);
      },
    });
  }

  convertData(reports: any): void {
    (Object.keys(reports) as (keyof typeof reports)[]).forEach((key) => {
      let obj = reports[key];
      const data = 'data' as keyof typeof obj;
      this.reports.push(obj[data]);
    });
  }

  deleteReport(id: number): void {
    this.http
      .delete<Report[]>(this.apiURL + 'reports/documents/' + id + '/')
      .subscribe({
        next: () => {
          location.reload();
        },
        error: (error) => {
          console.log('Error:', error);
        },
      });
  }

  toggleStatus(report: Report): void {
    let obj = {
      key: report.key,
      data: report,
    };
    if (report.status === 'READY FOR PICKUP') {
      obj['data'].status = 'RETRIEVED';
    } else {
      obj['data'].status = 'READY FOR PICKUP';
    }

    this.http
      .put<Report[]>(this.apiURL + 'reports/documents/' + report.key + '/', obj)
      .subscribe({
        next: (data) => {
          // console.log(data);
        },
        error: (error) => {
          console.log('Error:', error);
        },
      });
  }

  sortData(type: string): void {
    this.reports.sort(function (a, b) {
      let textA: string = a.name;
      let textB: string = b.name;
      if (type == 'name') {
        textA = a.name;
        textB = b.name;
      } else if (type == 'location') {
        textA = a.location;
        textB = b.location;
      } else if (type == 'date') {
        textA = a.date;
        textB = b.date;
      } else if (type == 'status') {
        textA = a.status;
        textB = b.status;
      }
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });
  }
}
