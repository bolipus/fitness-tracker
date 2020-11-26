import { Injectable } from '@angular/core';
import { Excercise } from './excercise.model';
import { map, take } from 'rxjs/operators';
import { Timestamp } from '@firebase/firestore-types';

import { AngularFirestore } from '@angular/fire/firestore';
import { UiService } from '../shared/ui.service';
import { Store } from '@ngrx/store';
import { AppState, getActiveTraining } from './training.reducer';
import { fetchAvailableTrainingsAction, fetchFinishedTrainingsAction, stopTraining, startTraining } from './training.actions';
import { startLoading, stopLoading } from '../shared/ui.actions';
import { Subscription } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  private subscriptions: Subscription[] = [];

  constructor(private firestore: AngularFirestore, private uiService: UiService, private store: Store<AppState>) {

  }

  fetchAvailableExcercises(): void {
    this.store.dispatch(startLoading());
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
          this.store.dispatch(stopLoading());
          this.store.dispatch(fetchAvailableTrainingsAction({ excercises }));
        },
        (error) => {
          this.store.dispatch(stopLoading());
          this.uiService.showSnackbar('Fetching available excercises failed, please try again,', undefined, 1000);
        }

      );
    this.subscriptions.push(fetchSubcription);
  }

  startExcercise(excerciseId: string): void {
    this.store.dispatch(startTraining({ excerciseId }))
  }

  completeExcercise(): void {
    this.store.select(getActiveTraining).pipe(take(1)).subscribe(
      (excercise: Excercise | undefined) => {
        if (excercise !== undefined) {
          this.addDataToDatabase({
            ...excercise,
            date: new Date(),
            state: 'completed'
          });
          this.store.dispatch(stopTraining());
        }

      }
    );


  }

  cancelExcercise(progress: number): void {

    this.store.select(getActiveTraining).pipe(take(1)).subscribe(
      (excercise: Excercise | undefined) => {
        if (excercise !== undefined) {
          this.addDataToDatabase({
            ...excercise,
            calories: excercise.calories * (progress / 100),
            duration: excercise.duration * (progress / 100),
            date: new Date(),
            state: 'cancelled'
          });
          this.store.dispatch(stopTraining());
        }

      }
    );
  }

  private addDataToDatabase(excercise: Excercise): void {
    this.firestore.collection('excercies').add(excercise);
  }


  fetchExcercises(): void {
    this.store.dispatch(startLoading());
    const excerciseSubscription = this.firestore
      .collection<Excercise>('excercies', ref => ref.orderBy('date', 'desc'))
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
          this.store.dispatch(stopLoading());
          this.store.dispatch(fetchFinishedTrainingsAction({ excercises }));
        },
        (error) => {
          this.store.dispatch(stopLoading());
          this.uiService.showSnackbar('Fetching excercises failed, please try again', undefined, 1000);
        }

      );
    this.subscriptions.push(excerciseSubscription);
  }

  cancelSubcriptions(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
