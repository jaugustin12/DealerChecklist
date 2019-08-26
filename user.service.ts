import { Injectable } from '@angular/core';
import { User } from '../../models/user-model/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { DataService } from '../dataService/data-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserService implements Resolve<boolean> {
  loggedIn: boolean;
  fitzUsers: any = [];
  selectedUser: User = {
    managers: '',
    role: '',
    fullName: '',
    email: '',
    password: '',
    phone: '',
    extension: null
  };

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True'})};

  constructor(private http: HttpClient, private data: DataService) { }


  // Http Methods
  postUser(user: User) {
   return this.http.post(environment.apiBaseUrl + '/api/register' , user, this.noAuthHeader);
  }

  login(authCredentials) {
    return this.http.post(environment.apiBaseUrl + '/api/authenticate', authCredentials, this.noAuthHeader);
  }

  getUserProfile() {
    if (this.getToken()) {
      return this.http.get(environment.apiBaseUrl + '/api/userprofile');
    } else {
      return null;
    }
  }

  getUsers() {
    fetch((environment.apiBaseUrl + '/api/users'))
    .then(response => response.json())
    .then(response => this.getTheFields(response))
    .catch(err => console.log(err));
  }


  getTheFields(response) {
    const fitzUser = {};
    let managers: string;
    let role: string;
    let fullName: string;
    let email: string;
    let phone: string;
    let extension: number;

    let i = 0;
    for (const user of response) {
      try {
        managers = user.managers;
      } catch (err) {
        managers = null;
      }
      try {
        role = user.role;
      } catch (err) {
        role = null;
      }
      try {
        fullName = user.fullName;
      } catch (err) {
        fullName = null;
      }
      try {
        email = user.email;
      } catch (err) {
        email = null;
      }
      try {
        phone = user.phone;
      } catch (err) {
        phone = null;
      }

      try {
        extension = user.extension;
      } catch (err) {
        extension = null;
      }
      fitzUser[0] = managers;
      fitzUser[1] = role;
      fitzUser[2] = fullName;
      fitzUser[3] = email;
      fitzUser[4] = phone;
      fitzUser[6] = extension;

      const userPage = new User(
        managers,
        role,
        fullName,
        email,
        phone,
        extension
      );
      this.fitzUsers[i] = userPage;
      i++;
    }
    this.data.users.next(this.fitzUsers);
    console.log(this.fitzUsers);
  }

  // Helper Methods
  getToken() {
    return localStorage.getItem('token');
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  getUserPayload() {
    const token = this.getToken();
    if (token) {
      const userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    } else {
      return null;
    }
  }

  isLoggedIn() {
    const userPayload = this.getUserPayload();
    if (userPayload) {
      this.loggedIn = true;
      return userPayload.esp > Date.now() / 1000;
    } else {
      this.loggedIn = false;
      return false;
    }
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return of(this.loggedIn);
  }
}
