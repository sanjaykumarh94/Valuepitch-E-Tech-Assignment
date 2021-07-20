import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Person } from '../models/person';
// import { map } from "rxjs/operators"
@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  private personList: Person[] = [];
  private personSub = new Subject<Person[]>();

  getPersons(): Observable<any> {
    return this.http.get('http://localhost:3000/api/person');

  }

  addPerson(person) {
    this.http
      .post<{ message: string }>("http://localhost:3000/api/person", person)
      .subscribe(responseData => {
        console.log(responseData.message);
        window.location.reload();
      });
  }

  updatePerson(id: string, person) {
    this.http
      .patch("http://localhost:3000/api/person/" + id, person)
      .subscribe(responseData => {
        console.log(responseData);
        window.location.reload();
      });
  }
}
