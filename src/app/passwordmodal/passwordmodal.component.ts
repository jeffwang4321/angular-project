import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Report } from '../interface';

@Component({
  selector: 'app-passwordmodal',
  templateUrl: './passwordmodal.component.html',
  styleUrls: ['./passwordmodal.component.css']
})
export class PasswordmodalComponent implements OnInit {
  @Input() report?: Report;

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  open(content: any) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
	}

}
