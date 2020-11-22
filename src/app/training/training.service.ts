import { Injectable } from '@angular/core';
import { Excercise } from './excercise.model';
import { Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Timestamp } from '@firebase/firestore-types';

import { AngularFirestore } from '@angular/fire/firestore';
import { UiService } from '../shared/ui.service';


@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  private availableExcercises: Excercise[] = [];

  excerciseChanged = new Subject<Excercise | undefined>();
  avalExcercisesChanged = new Subject<Excercise[]>();
  excercisesChanged = new Subject<Excercise[]>();

  private runningExcercise: Excercise | undefined;

  private excercises: Excercise[] = [];

  private subscriptions: Subscription[] = [];

  constructor(private firestore: AngularFirestore, private uiService: UiService) {

  }

  fetchAvailableExcercises(): void {
    this.uiService.loadingStateChanged.next(true);
    const fetchSubcription = this.firestore
      .collection<Excercise>('availableExcercises')
      .snapshotChanges()
      .pipe(
        map(exArray => {
          return exArray.map(ex => {
            return {
              ...ex.payload.doc.data(),
              id: ex.payload.doc.id,
            } as Excercise;
          }
          );
        }
        )
      ).subscribe(
        (excercises: Excercise[]) => {
          this.uiService.loadingStateChanged.next(false);
          this.availableExcercises = excercises;
          console.log(this.availableExcercises);
          this.avalExcercisesChanged.next(this.availableExcercises.slice());
        },
        (error) => {
          this.uiService.loadingStateChanged.next(false);
          this.uiService.showSnackbar('Fetching available excercises failed, please try again,', undefined, 1000);
          this.avalExcercisesChanged.next();
        }

      );
    this.subscriptions.push(fetchSubcription);
  }

  startExcercise(selectedExcerciseId: string | undefined): void {

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
      this.addDataToDatabase({
        ...this.runningExcercise,
        date: new Date(),
        state: 'completed'
      });
      this.runningExcercise = undefined;
      this.excerciseChanged.next();
    }

  }

  cancelExcercise(progress: number): void {
    if (this.runningExcercise !== undefined) {
      this.addDataToDatabase({
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

  private addDataToDatabase(excercise: Excercise) {
    this.firestore.collection('excercies').add(excercise);
  }

  getRunningExcercise(): Excercise | undefined {
    if (this.runningExcercise !== undefined) {
      return { ...this.runningExcercise };
    } else {
      return undefined;
    }
  }

  fetchExcercises(): void {
    const excerciseSubscription = this.firestore
      .collection<Excercise>('excercies')
      .snapshotChanges()
      .pipe(
        map(exArray => {
          return exArray.map(ex => {
            return {
              ...ex.payload.doc.data(),
              id: ex.payload.doc.id,
              date: (ex.payload.doc.data().date as any as Timestamp).toDate()
            } as Excercise;
          }
          );
        }
        )
      ).subscribe(
        (excercises: Excercise[]) => {
          this.excercises = excercises;
          this.excercisesChanged.next(this.excercises.slice());
        },
        (error) => {
          this.uiService.loadingStateChanged.next(false);
          this.uiService.showSnackbar('Fetching excercises failed, please try again', undefined, 1000);
        }

      );
    this.subscriptions.push(excerciseSubscription);
  }

  cancelSubcriptions(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
