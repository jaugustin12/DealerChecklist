import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/userService/user.service';
import { Router } from '@angular/router';
import { DataService } from '../../services/dataService/data-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'Dealer Trade Checklist';
  showCheckList;
  showDirectory = false;
  hover = false;
  hoverD = false;
  userDetails;

  constructor(private userService: UserService, private router: Router, private dataService: DataService) { }

  ngOnInit() {
    this.dataService.currentChecklist.subscribe(showCheckList => this.showCheckList = showCheckList);
  }

  toggleChecklist(): void {
    this.showCheckList = !this.showCheckList;
    this.dataService.toggleChecklist(this.showCheckList);
  }

  toggleDirectory(): void {
    this.showCheckList = false;
    this.showDirectory = !this.showDirectory;
  }

  onHover(): void {
    this.hover = !this.hover;
  }

  onHoverD(): void {
    this.hoverD = !this.hoverD;
  }

  onLogout() {
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }
}
