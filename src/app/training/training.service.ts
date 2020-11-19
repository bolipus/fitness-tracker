import { Injectable } from '@angular/core';
import { Excercise } from './excercise.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  private availableExcercises: Excercise[] = [
    { id: 'crounhes', name: 'Crounces', duration: 40, calories: 8 },
    { id: 'running', name: 'Running', duration: 20, calories: 200 },
    { id: 'walking', name: 'Walking', duration: 50, calories: 50 },
    { id: 'swimming', name: 'Swimming', duration: 80, calories: 150 }
  ];

  excerciseChanged = new Subject<Excercise | undefined>();

  private runningExcercise: Excercise | undefined;

  private excercises: Excercise[] = [];

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

  completeExcercise(): void {
    if (this.runningExcercise !== undefined) {
      this.excercises.push({
        ...this.runningExcercise,
        date: new Date(),
        state: 'completed'
      });
      this.runningExcercise = undefined;
      this.excerciseChanged.next(undefined);
    }

  }

  cancelExcercise(progress: number): void {
    if (this.runningExcercise !== undefined) {
      this.excercises.push({
        ...this.runningExcercise,
        calories: this.runningExcercise.calories * (progress / 100),
        duration: this.runningExcercise.duration * (progress / 100),
        date: new Date(),
        state: 'cancelled'
      });
      this.runningExcercise = undefined;
      this.excerciseChanged.next();
    }
  }

  getRunningExcercise(): Excercise | undefined {
    if (this.runningExcercise !== undefined) {
      return { ...this.runningExcercise };
    } else {
      return undefined;
    }
  }

  getExcercises(): Excercise[] {
    return this.excercises;
  }
}
