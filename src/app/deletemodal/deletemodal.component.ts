import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { Report, Location } from '../interface';

import {Md5} from 'ts-md5';

@Component({
  selector: 'app-deletemodal',
  templateUrl: './deletemodal.component.html',
  styleUrls: ['./deletemodal.component.css']
})
export class DeletemodalComponent {
  @Input() report?: Report;
  apiURL = 'https://272.selfip.net/apps/E1uq9AFJb3/collections/';
  @Input() password?: string;
  @Input() location?: Location;
  locationTemp?: Location;

  constructor(private modalService: NgbModal, private http: HttpClient) { }

  ngOnInit(): void {
  }

  open(content: any) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
    this.password = "";
	}

  validatePassword(): void {
		if (this.password === undefined || Md5.hashStr(this.password) !== "84892b91ef3bf9d216bbc6e88d74a77c") {
			alert("Incorrect Password");
		} else {
      
      this.setLocationTemp(this.report!.location);
      this.deleteReport(this.report!.key);
    }
	}

  deleteReport(key: number): void {
    this.http.delete<Report[]>(this.apiURL + 'reports/documents/' + key + '/',).subscribe({
      next: () => {
        location.reload();
      },
      error: (error) => {
        console.log('Error:', error);
      },
    });
  }

  decrementLocation(): void {
    if (this.locationTemp === undefined) {
      return
    }

    if (this.locationTemp.count === 1) {
      this.deleteLocation(this.locationTemp.key);
    } else {
      let obj = {
        "key": this.locationTemp.key,
        "data": this.locationTemp,
      }
      obj["data"]!.count -= 1;
      this.http.put<Location[]>(this.apiURL + 'locations/documents/' + this.locationTemp.key + '/',
        obj
      ).subscribe({
        next: (data) => {
          // console.log(data);
        },
        error: (error) => {
          console.log('Error:', error);
        },
      });
    }
	}

  setLocationTemp(locationName: string): void{
    this.http.get<Location[]>(this.apiURL + 'locations/documents/'
		).subscribe({
      next: (data) => {
        this.filterLocation(data, locationName);
      },
      error: (error) => {
        console.log('Error:', error);
      },
    });
  }

  filterLocation(locations: Location[], locationName: string): void{
    (Object.keys(locations) as (keyof typeof locations)[]).forEach((key): any => {
      let obj = locations[key];
      const data = 'data' as keyof typeof obj;
      if (obj[data]['name'] === locationName) {
        this.locationTemp = obj[data];
        this.decrementLocation();
      }
    });

  }

  deleteLocation(key: number): void{
    this.http.delete<Location[]>(this.apiURL + 'locations/documents/' + key + '/',).subscribe({
      next: () => {
        // location.reload();
      },
      error: (error) => {
        console.log('Error:', error);
      },
    });
  }
}
