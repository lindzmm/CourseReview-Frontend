import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatTableModule } from '@angular/material';
import {CoursesComponent} from './courses/courses.component';
import {HttpClientModule} from '@angular/common/http';
import { ReviewsComponent } from './reviews/reviews.component';
import { AddCourseComponent } from './add-course/add-course.component';
import {MatDialogModule} from '@angular/material/dialog';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import { AddReviewComponentComponent } from './add-review-component/add-review-component.component';
import { AddReviewComponent } from './add-review/add-review.component';

@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    ReviewsComponent,
    AddCourseComponent,
    AddReviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    HttpClientModule,
    MatDialogModule,
    NgbModule,
    FormsModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    AddCourseComponent
  ]
})
export class AppModule { }
