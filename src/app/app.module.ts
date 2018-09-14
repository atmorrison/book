import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { UserPageComponent } from './user-page/user-page.component';
import { ApptListComponent } from './appt-list/appt-list.component';
import { HomeComponent } from './home/home.component';
import { ApptPageComponent } from './appt-page/appt-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UserPageComponent,
    ApptListComponent,
    HomeComponent,
    ApptPageComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
