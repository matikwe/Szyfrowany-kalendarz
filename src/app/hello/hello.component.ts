import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.css'],
})
export class HelloComponent implements OnInit {
  constructor() {}

  myVariable = 'Stanisław';
  bitwiseOR = 2 | 5;

  ngOnInit(): void {}
}
