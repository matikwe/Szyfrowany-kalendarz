import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface myData {
  success: boolean;
  message: string;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  // private loggedInStatus = JSON.parse(
  //   localStorage.getItem('loggedIn') || 'false'
  // );

  private loggedInStatus = false;

  get isLoggedIn() {
    // return JSON.parse(
    //   localStorage.getItem('loggedIn') || this.loggedInStatus.toString()
    // );
    return this.loggedInStatus;
  }
  setLoggedIn(value: boolean) {
    this.loggedInStatus = value;
    // localStorage.setItem('loggedIn', 'true');
  }
  getUserDetails(username, password) {
    return this.http.post<myData>('./api/auth.php', {
      username,
      password,
    });
  }
}
