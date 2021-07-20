import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './modules/login/login.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PersonsListComponent } from './modules/persons-list/persons-list.component';
import { PersonDetailsComponent } from './modules/person-details/person-details.component';
import { PersonEditComponent } from './modules/person-edit/person-edit.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreatePersonComponent } from './modules/create-person/create-person.component';
// import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CommonModule } from "@angular/common";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AgePipe } from './pipes/agePipe';
import { AuthInterceptor } from './services/auth-interceptor';
import { HeaderComponent } from './modules/header/header.component';
import { AuthGuard } from './services/auth.guard';
// import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PersonsListComponent,
    PersonDetailsComponent,
    PersonEditComponent,
    CreatePersonComponent,
    AgePipe,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    // // FormBuilder,
    // BsDatepickerModule.forRoot(),
    // // DatepickerModule.forRoot(),
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }, AuthGuard],
  // exports: [AgePipe],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
