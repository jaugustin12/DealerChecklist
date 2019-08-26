import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/userService/user.service';
import { DataService } from '../../services/dataService/data-service.service';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.css']
})
export class DirectoryComponent implements OnInit {
  users;
  dataSource = this.users;
  displayedColumns: string[] = ['role', 'fullName', 'email', 'phone', 'extension'];

  constructor(private userService: UserService, private data: DataService) { }

  ngOnInit() {
    this.data.currentUsers.subscribe(users => (this.users = users));
    console.log(this.users);
  }


}
