import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(private Auth: AuthService, private router: Router) {}

  ngOnInit(): void {}

  dataRegister: any = {};

  validateEmail(email) {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(email);
  }

  validatePassword(password) {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    return regex.test(password);
  }

  registerUser(event) {
    event.preventDefault();
    const target = event.target;
    const email = target.querySelector('#email').value;
    const username = target.querySelector('#username').value;
    const password = target.querySelector('#password').value;
    if (!this.validateEmail(email)) {
      window.alert('Nieprawidłowy adres email');
    }

    if (!this.validatePassword(password)) {
      window.alert('Nieprawdiłowe hasło!');
    }

    if (this.validatePassword(password) && this.validateEmail(email)) {
      this.Auth.getRegisterDetails(email, username, password).subscribe(
        (data) => {
          if (data.success) {
            this.router.navigate(['register']);
            window.alert('Utworzono konto');
            this.Auth.setRegistred(true);
          } else {
            window.alert(data.message);
          }
        }
      );
    }

    // console.log(email, username, password);
  }
}
