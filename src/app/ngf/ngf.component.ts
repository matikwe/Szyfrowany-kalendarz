import { Component, OnInit } from '@angular/core';
import { RecordsService } from '../records.service';

@Component({
  selector: 'app-ngf',
  templateUrl: './ngf.component.html',
  styleUrls: ['./ngf.component.css'],
})
export class NgfComponent implements OnInit {
  records = {};
  constructor(private myFirstService: RecordsService) {}

  message = 'Loading....';

  ngOnInit() {
    this.records = this.myFirstService.getData();
  }
}
