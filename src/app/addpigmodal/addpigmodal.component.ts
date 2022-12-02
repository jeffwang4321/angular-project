import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { Report, Location } from '../interface';

@Component({
  selector: 'app-addpigmodal',
  templateUrl: './addpigmodal.component.html',
  styleUrls: ['./addpigmodal.component.css']
})
export class AddpigmodalComponent implements OnInit {
	apiURL = 'https://272.selfip.net/apps/E1uq9AFJb3/collections/';
	
	@Input() reportInput: Report = {
		name: "",
		phone: "",
		id: 0,
		breed: "",
		location: "",
		notes: "",
		date: new Date(),
		status: "READY FOR PICKUP",
		key: 0, 
  };

	@Input() locationInput: Location = {
		name: "",
		lon: 0,
		lat: 0,
		count: 0,
		key: 0,
  };

	constructor(private modalService: NgbModal, private http: HttpClient) {}

	ngOnInit(): void {
  }

	open(content: any) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				// console.log('Result', result);
				// console.log(this.reportInput);
				// console.log(this.locationInput);
				this.addReport();
				// this.addLocation();
			},
			(reason) => {
				console.log('Reason', reason);
			},
		);
	}

	addReport(): void {
		const KEY = new Date().valueOf();
		let obj = {
			"key": KEY,
			"data": this.reportInput,
		}
		obj["data"].key = KEY;

    this.http.post<Report[]>(this.apiURL + 'reports/documents/',
    	obj
		).subscribe({
      next: (data) => {
        // console.log(data);
				location.reload();
      },
      error: (error) => {
        console.log('Error:', error);
      },
    });
  }

	addLocation(): void {
    this.http.post<Report[]>(this.apiURL + 'locations/documents/',
    	{
				"key": new Date().valueOf(),
				"data": this.locationInput,
			}	
		).subscribe({
      next: (data) => {
        // console.log(data);
				location.reload();
      },
      error: (error) => {
        console.log('Error:', error);
      },
    });
  }
}
