import { Component, OnInit, OnChanges } from '@angular/core';
import { UserService } from '../../services/userService/user.service';
import { NgForm } from '@angular/forms';

export interface Dealership {
  value: string;
  viewValue: string;
}

export interface Role {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  showSuccessMessage: boolean;
  serverErrorMessages: string;
  carDealership: string;
  dealerships: Dealership[] = [
    {value: 'Hyundai', viewValue: 'Hyundai'},
    {value: 'Subaru', viewValue: 'Subaru'},
    {value: 'Hyundai and Subaru', viewValue: 'Hyundai and Subaru'}
  ];
  roles: Role[] = [
    {value: 'admin', viewValue: 'admin'},
    {value: 'manager', viewValue: 'manager'},
    {value: 'employee', viewValue: 'employee'}
  ];
  constructor(private userService: UserService) { }


  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    if (this.carDealership === 'Hyundai') {
      this.userService.selectedUser.managers = 'rosenfeldd@fitzmall.com,ascherd@fitzgeraldautomall.com,dalessioj@fitzgeraldautomall.com';
    }
    if (this.carDealership === 'Subaru') {
      this.userService.selectedUser.managers = 'davisr@fitzgeraldautomall.com,speeckaertc@fitzgeraldautomall.com';
    }
    if (this.carDealership === 'Hyundai and Subaru') {
      this.userService.selectedUser.managers = 'davisr@fitzgeraldautomall.com,speeckaertc@fitzgeraldautomall.com,rosenfeldd@fitzmall.com' +
      ',ascherd@fitzgeraldautomall.com,dalessioj@fitzgeraldautomall.com';
    }
    console.log(this.userService.selectedUser.managers);
    console.log(this.userService.selectedUser.role);
    this.userService.postUser(this.userService.selectedUser).subscribe(
      res => {
        this.showSuccessMessage = true;
        setTimeout(() => this.showSuccessMessage = false, 4000);
        this.resetForm(form);
      },
      err => {
        if (err.status === 422) {
          this.serverErrorMessages = err.error.join(' \n');
        } else {
          this.serverErrorMessages = 'Something went wrong';
        }
      }
    );
  }
  resetForm(form: NgForm) {
    this.userService.selectedUser = {
      managers: '',
      role: '',
      fullName: '',
      email: '',
      password: '',
      phone: '',
      extension: null
    };
    form.resetForm();
    this.serverErrorMessages = '';
  }

}
