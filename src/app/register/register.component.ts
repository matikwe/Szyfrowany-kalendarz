import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private Auth: AuthService, private router: Router) { }

  ngOnInit(): void {}

  dataRegister: any = {};
  
  registerUser(event){
    event.preventDefault();
    const target = event.target;
    const email = target.querySelector('#email').value;
    const username = target.querySelector('#username').value;
    const password = target.querySelector('#password').value;
    
      this.Auth.getRegisterDetails(email, username, password).subscribe((data) => {
        if (data.success) {
          this.router.navigate(['register']);
          this.Auth.setRegistred(true);
        } else {
          window.alert(data.message);
        }
      });
      console.log(email, username, password);
    }
}
