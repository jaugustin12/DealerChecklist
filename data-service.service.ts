import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public users = new BehaviorSubject<any>([]);
  currentUsers = this.users.asObservable();

  public showChecklist = new BehaviorSubject<boolean>(false);
  currentChecklist = this.showChecklist.asObservable();

  constructor() { }

  getUsers(users) {
    this.users.next(users);
  }

  toggleChecklist(showChecklist) {
    this.showChecklist.next(showChecklist);
  }

}
