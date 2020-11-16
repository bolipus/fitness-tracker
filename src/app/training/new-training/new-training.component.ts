import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  excercises: string[] = ['Crounces', 'Running', 'Walking', 'Swimming'];

  constructor() { }

  ngOnInit(): void {
  }

}
