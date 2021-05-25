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

  private loggedInStatus = false;
  private registredStatus = false;

  get isLoggedIn() {
    return this.loggedInStatus;
  }
  setLoggedIn(value: boolean) {
    this.loggedInStatus = value;
  }
  getUserDetails(username, password) {
    return this.http.post<myData>('./api/auth.php', {
      username,
      password,
    });
  }
  setRegistred(value: boolean) {
    this.registredStatus = value;
  }
  getRegisterDetails(email, username, password){
    return this.http.post<myData>('./api/register.php', {
      email, 
      username, 
      password,
    });
  }
}
