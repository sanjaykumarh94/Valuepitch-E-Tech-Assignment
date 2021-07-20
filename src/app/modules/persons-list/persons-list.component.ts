import { Component, OnInit, Output } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Person } from 'src/app/models/person';
import { AuthService } from 'src/app/services/auth.service';
import { PersonService } from 'src/app/services/person.service';
@Component({
  selector: 'app-persons-list',
  templateUrl: './persons-list.component.html',
  styleUrls: ['./persons-list.component.scss']
})
export class PersonsListComponent implements OnInit {
  List: Person[];
  personDetail: Person;
  typeP: string;
  closeResult = '';
  userId: string;
  userIsAuthenticated = false;
  private authStatusSub: Subscription;

  constructor(
    private modalService: NgbModal,
    private authService: AuthService,
    private personService: PersonService
  ) { }

  ngOnInit() {

    this.userId = this.authService.getUserId();
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      });
    this.personService.getPersons().subscribe((items) => {
      this.List = items.posts;
      // this.name = "Men's";
      console.log("List", this.List)
    });
  }

  // openLg(detail, item) {
  //   console.log(item);
  //   this.personDetail = item;
  //   this.modalService.open(detail, { size: 'md' });
  // }

  dismiss() {
    this.modalService.dismissAll();
  }

  // editModal(edit, item) {
  //   console.log(item);
  //   this.personDetail = item;
  //   this.modalService.open(edit, { size: 'md' });
  // }
  detailO(detail, item) {

    this.personDetail = item;
    this.modalService.open(detail, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  create(createP) {
    this.typeP = "new";
    this.modalService.open(createP, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  editModal(createP, item) {
    this.typeP = "edit";
    this.personDetail = item;
    this.modalService.open(createP, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  // editModal(edit, item) {

  //   this.personDetail = item;
  //   this.modalService.open(edit, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
  //     this.closeResult = `Closed with: ${result}`;
  //   }, (reason) => {
  //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //   });
  // }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
