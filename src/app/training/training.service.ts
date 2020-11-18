import { Injectable } from '@angular/core';
import { Excercise } from './excercise.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  private availableExcercises: Excercise[] = [
    { id: 'crounhes', name: 'Crounces', duration: 2, calories: 8 },
    { id: 'running', name: 'Running', duration: 5, calories: 200 },
    { id: 'walking', name: 'Walking', duration: 10, calories: 50 },
    { id: 'swimming', name: 'Swimming', duration: 15, calories: 150 }
  ];

  excerciseChanged = new Subject<Excercise | undefined>();

  private runningExcercise: Excercise | undefined;

  constructor() {

  }



  getAvailableExcercises(): Excercise[] {
    return this.availableExcercises.slice();
  }

  startExcercise(selectedExcerciseId: string | undefined): void {
    console.log('selectedExcerciseId:' + selectedExcerciseId);
    if (selectedExcerciseId !== undefined) {
      this.runningExcercise = this.availableExcercises.find(ex => ex.id === selectedExcerciseId);
      if (this.runningExcercise !== undefined) {
        console.log('selectedExcerciseName:' + this.runningExcercise?.name);
        this.excerciseChanged.next({ ...this.runningExcercise });
      }

    }
  }

  getRunningExcercise(): Excercise | undefined {
    if (this.runningExcercise !== undefined) {
      return { ...this.runningExcercise };
    } else {
      return undefined;
    }
  }
}
