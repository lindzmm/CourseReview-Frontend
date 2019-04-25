import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CoursesComponent} from './courses/courses.component';
import {ReviewsComponent} from './reviews/reviews.component';
import { CommonModule } from '@angular/common';
import {AppComponent} from './app.component';
import {DepartmentComponent} from './department/department.component';

const routes: Routes = [
  {
    path: 'courses',
    component: CoursesComponent
  },
  {
    path: 'courses/:id',
    component: ReviewsComponent
  },
  {
    path: 'departments',
    component: DepartmentComponent
  },
  {
    path: 'departments/:id',
    component: CoursesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
  CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
