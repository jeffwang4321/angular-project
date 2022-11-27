import { Component } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-addpigmodal',
  templateUrl: './addpigmodal.component.html',
  styleUrls: ['./addpigmodal.component.css']
})
export class AddpigmodalComponent {
	apiURL =
	'https://272.selfip.net/apps/E1uq9AFJb3/collections/reports/documents/';

	constructor(private modalService: NgbModal, private http: HttpClient) {}

	open(content: any) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				console.log('result', result);
			},
			(reason) => {
				console.log('reason', reason);
			},
		);
	}

	addPig(): void {
    this.http.post(this.apiURL,
    	{"key":"mykey2", "data":"myvalue"}
    ).subscribe(data => {
      console.log(data)
    })
  }
}
