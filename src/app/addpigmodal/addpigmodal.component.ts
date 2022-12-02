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
		id: "",
		breed: "",
		location: "",
		notes: "",
		date: (new Date()).toLocaleString(),
		status: "READY FOR PICKUP",
		key: 0, 
  };

	@Input() locationInput: Location = {
		name: "",
		lon: "",
		lat: "",
		count: 0,
		key: 0,
  };

	constructor(private modalService: NgbModal, private http: HttpClient) {}

	ngOnInit(): void {
  }

	open(content: any) {
		this.modalService.open(content);
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

	validateReport(): void {
		if (this.reportInput.name === "") {
			alert("Please enter a reporter name");
		} else if (this.reportInput.phone == null || (this.reportInput.phone).toString().length != 10) {
			alert("Please enter a 10 digit phone number");
		} else if (this.reportInput.location === "") {
			alert("Please enter a location");
		} else if (this.reportInput.id === "" || this.reportInput.id === null || Number(this.reportInput.id) < 0) {	
			alert("Please enter a non-negative pig ID");
		} else if (this.reportInput.breed === "") {
			alert("Please enter a pig breed");
		} else {
			this.addReport();
			this.modalService.dismissAll();
		}
	}
}
