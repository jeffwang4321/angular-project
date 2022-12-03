import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { Report } from '../interface';

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

  constructor(private modalService: NgbModal, private http: HttpClient) { }

  ngOnInit(): void {
  }

  open(content: any) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
	}

  validatePassword(): void {
		if (this.password === undefined || Md5.hashStr(this.password) !== "84892b91ef3bf9d216bbc6e88d74a77c") {
			alert("Incorrect Password");
		} else {
      this.deleteReport(this.report!.key);
    }
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

}
