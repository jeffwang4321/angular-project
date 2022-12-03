import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { Report } from '../interface';

import {Md5} from 'ts-md5';

@Component({
  selector: 'app-togglestatusmodal',
  templateUrl: './togglestatusmodal.component.html',
  styleUrls: ['./togglestatusmodal.component.css']
})
export class TogglestatusmodalComponent {
  @Input() report?: Report;
  apiURL = 'https://272.selfip.net/apps/E1uq9AFJb3/collections/';
  @Input() password?: string;

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
      this.toggleStatus(this.report!);
    }
	}

  toggleStatus(report: Report): void {
		let obj = {
			"key": report.key,
			"data": report,
		}
		if (report.status === "READY FOR PICKUP"){
      obj["data"].status = "RETRIEVED";
    } else {
      obj["data"].status = "READY FOR PICKUP";
    }

    this.http.put<Report[]>(this.apiURL + 'reports/documents/' + report.key + '/',
    	obj
		).subscribe({
      next: (data) => {
        // console.log(data);
				// location.reload();
        this.modalService.dismissAll();
      },
      error: (error) => {
        console.log('Error:', error);
      },
    });

  }

}
