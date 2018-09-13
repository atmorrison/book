import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, map, share } from 'rxjs/operators';

import { User } from '../user';

import { AppointmentService } from '../appointment.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  users$: Observable<User[]>;
  searching: boolean = false;
  private searchTerms = new Subject<string>();
  @ViewChild('autoUser') autoUser;
  @ViewChild('searchBox') searchBox;

  constructor(
    private apptService: AppointmentService,
    private router: Router
    ) { }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  searchUsers(term: string): Observable<User[]> {
    if (!term.trim()) {return of([])}
    return this.apptService.getUsers().pipe(
      map(users => users.filter(user => user.Name.toLowerCase().startsWith(term.toLowerCase())))
    )
  }

  autofill(): void {
    if (this.autoUser) {
      this.searchBox.nativeElement.value = this.autoUser.nativeElement.innerHTML;
      this.searchBox.nativeElement.blur();
    }
  }

  go(): void {
    const id = this.autoUser.nativeElement.className;
    this.router.navigate([`/u/${id}`]);
  }

  ngOnInit(): void {
    this.users$ = this.searchTerms.pipe(
      debounceTime(300),
      switchMap((term: string) => this.searchUsers(term)),
      share()
    )
  }

}
