import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { TrainingService } from '../training.service';
import { Excercise } from '../excercise.model';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  excercises: Excercise[] | null = null;

  selectedExcerciseId: string | undefined;

  constructor(private trainingService: TrainingService) {

  }

  ngOnInit(): void {
    this.excercises = this.trainingService.getAvailableExcercises();
  }

  onStartTraining(): void {
    this.trainingService.startExcercise(this.selectedExcerciseId);
  }
}
