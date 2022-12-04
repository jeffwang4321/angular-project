import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Report } from '../interface';

@Component({
  selector: 'app-infomodal',
  templateUrl: './infomodal.component.html',
  styleUrls: ['./infomodal.component.css'],
})
export class InfomodalComponent {
  @Input() report?: Report;

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {}

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }
}
