import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CoursesComponent} from './courses/courses.component';
import {ReviewsComponent} from './reviews/reviews.component';
import { CommonModule } from '@angular/common';
import {AppComponent} from './app.component';
import {DepartmentComponent} from './department/department.component';
import {SearchComponent} from './search/search.component';
import {SelectedSearchComponent} from './selected-search/selected-search.component';

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
  },
  {
    path: 'search/:id',
    component: SearchComponent
  },
  {
    path: 'search/checked/:id',
    component: SelectedSearchComponent
  },
  {
    path: '',
    redirectTo: 'departments',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
  CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
