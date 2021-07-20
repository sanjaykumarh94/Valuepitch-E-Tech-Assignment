import { Component, Injectable, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Person } from 'src/app/models/person';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as uuid from 'uuid/dist';
import { v4 as uuidv4 } from 'uuid';
import { PersonService } from 'src/app/services/person.service';
@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {

  readonly DELIMITER = '/';

  parse(value: string): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10)
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : '';
  }
}

@Component({
  selector: 'app-create-person',
  templateUrl: './create-person.component.html',
  styleUrls: ['./create-person.component.scss'],
  providers: [
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter }
  ]
})
export class CreatePersonComponent implements OnInit {
  submitted = false;
  createForm: FormGroup;
  newC: boolean;
  date: any;
  closeResult = '';
  personID: string;
  imgURL: string;
  @Input() type: any;
  @Input() personD: any;
  constructor(
    private modalService: NgbModal,
    private personS: PersonService,
    titleService: Title,
  ) {
    titleService.setTitle('Create Person');
  }

  ngOnInit() {
    console.log("type" + this.type);
    if (this.type == "edit") {
      console.log("personD" + JSON.stringify(this.personD));
      const personD: Person = this.personD;
      this.imgURL = this.personD.avatar
      this.personID = personD._id;
      this.createForm = new FormGroup({
        name: new FormControl(personD.name, [Validators.required]),
        email: new FormControl(personD.email, [Validators.required, Validators.email]),
        dob: new FormControl(personD.dob, [Validators.required]),
        address: new FormControl(personD.address, [Validators.required]),
        country: new FormControl(personD.country, [Validators.required])
      });
    } else if (this.type == "new") {
      this.newC = true
      this.createForm = new FormGroup({
        name: new FormControl(null, [Validators.required]),
        email: new FormControl(null, [Validators.required, Validators.email]),
        dob: new FormControl(null, [Validators.required]),
        address: new FormControl(null, [Validators.required]),
        country: new FormControl(null, [Validators.required])
      });
    }

  }
  addItem(event) {
    console.log(event)
    this.imgURL = event

  }


  cancel() {
    console.log("cancel")
    this.modalService.dismissAll();
  }
  onSubmit() {
    this.submitted = true;
    // const dat = this.parse(this.createForm.value.dob)
    console.log()
    if (this.createForm.valid) {
      this.date = (this.createForm.value.dob.day + '/' + this.createForm.value.dob.month + '/' + this.createForm.value.dob.year)
      console.log('date ' + this.date)
      console.log("createForm" + JSON.stringify(this.createForm.value));
      const person = this.buildPersonModel();
      if (this.type == "new") {
        this.personS.addPerson(person);
        this.ngOnInit();
      } else if (this.type == "edit") {
        this.personS.updatePerson(this.personID, person);
      }
      // this.ngOnInit();
      this.modalService.dismissAll();

    } else {
      console.log('not valid');
    }

  }

  updateP() {
    this.submitted = true;
    // const dat = this.parse(this.createForm.value.dob)
    console.log()
    if (this.createForm.valid) {
      this.date = (this.createForm.value.dob.day + '-' + this.createForm.value.dob.month + '-' + this.createForm.value.dob.year)
      console.log('date ' + this.date)
      console.log("createForm" + JSON.stringify(this.createForm.value));
      const person = this.buildPersonModel();
      // const id = this.personID
      this.personS.updatePerson(this.personID, person);
      this.modalService.dismissAll();
    } else {
      console.log('not valid');
    }
  }

  buildPersonModel(): Person {
    const personFormData = this.createForm.value;
    const person: Person = new Person();
    person.name = personFormData.name;
    person._id = this.personID;
    person.dob = this.date;
    // person.personId = uuidv4();
    person.email = personFormData.email;
    person.avatar = this.imgURL;
    person.address = personFormData.address;
    person.country = personFormData.country;
    person.countryLagLat = " ";
    person.creator = null;

    return person;
  }


  get name() {
    return this.createForm.get("name");
  }

  get email() {
    return this.createForm.get("email");
  }

  get dob() {
    return this.createForm.get("dob");
  }

  get address() {
    return this.createForm.get("address");
  }

  get country() {
    return this.createForm.get("country");
  }

}
