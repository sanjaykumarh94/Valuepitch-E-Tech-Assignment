import { Component, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Person } from 'src/app/models/person';

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.scss']
})
export class PersonDetailsComponent implements OnInit {
  @Input() personD: Person;
  constructor(
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    console.log('seleected dac acd product' + JSON.stringify(this.personD))
  }
  CheckOut() {
    this.modalService.dismissAll;

  }

}
