import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-person-edit',
  templateUrl: './person-edit.component.html',
  styleUrls: ['./person-edit.component.scss']
})
export class PersonEditComponent implements OnInit {
  @Input() personD: any;

  constructor() { }

  ngOnInit() {
    console.log("sdf gddddddddddd" + this.personD);

  }

}
