import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserPageComponent } from './user-page/user-page.component';
import { HomeComponent } from './home/home.component';
import { ApptPageComponent } from './appt-page/appt-page.component';
import { ApptEditComponent } from './appt-edit/appt-edit.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "u/:Id", component: UserPageComponent },
  { path: "a/:Id", component: ApptPageComponent },
  { path: "a/:Id/edit", component: ApptEditComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
