import { Target } from '@angular/compiler';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Excercise } from '../excercise.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort) sort: MatSort | null = null;

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  displayedColumns: string[] = ['date', 'name', 'duration', 'calories', 'state'];

  dataSource = new MatTableDataSource<Excercise>();

  constructor(trainingService: TrainingService) {
    this.dataSource.data = trainingService.getExcercises();
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
  }

  doFilter(event: any): void {
    if (event.target.value != null) {
      console.log('filterValue:' + event.target.value);
      this.dataSource.filter = event.target.value.trim().toLowerCase();
    }


  }
}
