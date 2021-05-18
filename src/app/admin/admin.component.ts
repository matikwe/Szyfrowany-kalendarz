import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  constructor(private user: UserService) {}
  message = 'Loading....';
  ngOnInit(): void {
    this.user.getSomeData().subscribe((data) => {
      this.message = data.message;
      // if (!data.success) {
      //   localStorage.removeItem('loggedIn');
      // }
    });
  }
}
