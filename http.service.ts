import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {}

  httpGet(url) {
    return this.http.get(url);
  }

  httpPost(url, {}) {
    return this.http.post(url, { name: 'Subrat' });
  }

  sendEmail(url, userDetails, data) {
    data.userDetails = userDetails;
    console.log('urlll====>>>', url);
    console.log('email===>>', userDetails);
    console.log('data====>>>>', data);
    return this.http.post(url, data);
  }
}
