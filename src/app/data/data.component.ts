import { Component, OnInit } from '@angular/core';
import { RecordsService } from '../records.service';
@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css'],
})
export class DataComponent implements OnInit {
  constructor(private myFirstService: RecordsService) {}

  records = {};
  ngOnInit(): void {
    this.myFirstService.getData().subscribe((data) => {
      this.records = data.obj;
    });
  }
}
