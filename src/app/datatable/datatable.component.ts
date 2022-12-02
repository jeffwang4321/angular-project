import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Report } from '../interface';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css']
})
export class DatatableComponent implements OnInit {
  reports: Report[] = [];
  apiURL = 'https://272.selfip.net/apps/E1uq9AFJb3/collections/';

  constructor(private http: HttpClient) { }

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
    // console.log(reports);
    (Object.keys(reports) as (keyof typeof reports)[]).forEach((key) => {
      let obj = reports[key];
      const data = 'data' as keyof typeof obj;
      this.reports.push(obj[data]);
    });
    // console.log(this.reports);
  }

	getReport(id: number): void {
    this.http.get<Report[]>(this.apiURL + 'reports/documents/' + id + '/',).subscribe({
      next: (data: any) => {
        alert(
          `Name: ${data['data']['name']} \nPhone: ${data['data']['phone']} \nID: ${data['data']['id']} \nBreed:${data['data']['breed']} \nLocation: ${data['data']['location']} \nNotes: ${data['data']['notes']}`
        ); 
        // console.log(data['data']);
      },
      error: (error) => {
        console.log('Error:', error);
      },
    });
  }

  deleteReport(id: number): void {
    this.http.delete<Report[]>(this.apiURL + 'reports/documents/' + id + '/',).subscribe({
      next: () => {
        location.reload();
      },
      error: (error) => {
        console.log('Error:', error);
      },
    });
  }

  sortLocation(): void {
    this.reports.sort(function(a, b) {
      let textA: string = a.location;
      let textB: string = b.location;
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    })
  }
  sortName(): void {
    this.reports.sort(function(a, b) {
      let textA: string = a.name;
      let textB: string = b.name;
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    })
  }
  sortDate(): void {
    this.reports.sort(function(a, b) {
      let textA: string = a.date;
      let textB: string = b.date;
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    })
  }
  sortStatus(): void {
    this.reports.sort(function(a, b) {
      let textA: string = a.status;
      let textB: string = b.status;
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    })
  }
}
