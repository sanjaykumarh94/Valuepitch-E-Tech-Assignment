import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatePersonComponent } from './modules/create-person/create-person.component';
import { LoginComponent } from './modules/login/login.component';
import { PersonDetailsComponent } from './modules/person-details/person-details.component';
import { PersonEditComponent } from './modules/person-edit/person-edit.component';
import { PersonsListComponent } from './modules/persons-list/persons-list.component';
import { AuthGuard } from './services/auth.guard';


const routes: Routes = [
  { path: '', redirectTo: 'personslist', pathMatch: 'full', },
  { path: 'personslist', component: PersonsListComponent },
  { path: 'login', component: LoginComponent },

];

@NgModule({
  imports:
    [
      CommonModule,
      RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })
    ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
