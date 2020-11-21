import { Target } from '@angular/compiler';
import { AfterViewInit, Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Excercise } from '../excercise.model';
import { TrainingService } from '../training.service';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-past-training',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(MatSort) sort: MatSort | null = null;

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  displayedColumns: string[] = ['date', 'name', 'duration', 'calories', 'state'];

  dataSource = new MatTableDataSource<Excercise>();

  excercisesSubscription: Subscription | null = null;

  constructor(trainingService: TrainingService) {
    trainingService.excercisesChanged.subscribe((excercices: Excercise[]) => {
      console.log(excercices);
      this.dataSource.data = excercices;
    })

    trainingService.fetchExcercises();
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.excercisesSubscription?.unsubscribe();
  }

  doFilter(event: any): void {
    if (event.target.value != null) {
      console.log('filterValue:' + event.target.value);
      this.dataSource.filter = event.target.value.trim().toLowerCase();
    }


  }
}
