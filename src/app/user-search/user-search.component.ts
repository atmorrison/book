import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, of } from 'rxjs';
import { debounceTime, switchMap, map, share } from 'rxjs/operators';

import { User } from '../user';

import { AppointmentService } from '../appointment.service';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent implements OnInit {
  users$: Observable<User[]>;
  searching: boolean = false;
  private searchTerms = new Subject<string>();
  @ViewChild('autoUser') autoUser;
  @ViewChild('searchBox') searchBox;
  @Input('searchIcon') searchIcon;
  @Input('purpose') purpose;

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
    if (this.autoUser) {
      const id = this.autoUser.nativeElement.className;
      if (this.purpose==="nav") {
        this.router.navigate([`/u/${id}`]);
      } else if (this.purpose==="add") {
        
      }
    }
  }

  ngOnInit(): void {
    this.users$ = this.searchTerms.pipe(
      debounceTime(300),
      switchMap((term: string) => this.searchUsers(term)),
      share()
    )
  }
}
