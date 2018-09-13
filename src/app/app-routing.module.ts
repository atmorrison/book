import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserPageComponent } from './user-page/user-page.component';

const routes: Routes = [
//  { path: "", component: ComponentName  }
  { path: "u/:Id", component: UserPageComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
