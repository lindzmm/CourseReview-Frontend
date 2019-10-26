import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {CourseService} from '../services/course.service';
import {NgForm} from '@angular/forms';
import {NewReview} from '../newReview';
import {ReviewService} from '../services/review.service';
import {ActivatedRoute} from '@angular/router';
import { Course } from '../course';
import {DatePipe, getLocaleDateTimeFormat} from '@angular/common';


@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent implements OnInit {
  difficultyRating: number;
  interestRating: number;
  reviewText: string;
  tipsForSuccess: string;
  professor: string;
  date_posted: string;
  course: Course;
  courseURL: string;
  review: NewReview;
  public courseId: string;

  pipe = new DatePipe('en-US');

  constructor(public activeModal: NgbActiveModal,
              private reviewService: ReviewService,
              private route: ActivatedRoute,
              private courseService: CourseService) { }

  ngOnInit() {
  }


  onSubmit(form: NgForm) {
    this.difficultyRating = form.value.difficultyRating;
    this.interestRating = form.value.interestRating;
    this.reviewText = form.value.review_text;
    this.tipsForSuccess = form.value.tipsForSuccess;
    this.professor = form.value.professor;
    this.courseURL = 'http://localhost:8000/api/course/' + this.courseId;
    const year = Date.now();
    const myFormattedYear = this.pipe.transform(year, 'yyyy');
    const month = Date.now();
    const myFormattedMonth = this.pipe.transform(month, 'MM');
    const date = Date.now();
    const myFormattedDate = this.pipe.transform(date, 'dd');
    const hour = Date.now();
    const myFormattedHour = this.pipe.transform(hour, 'HH');
    const min = Date.now();
    const myFormattedMin = this.pipe.transform(min, 'mm');
    const milsec = Date.now();
    const myFormattedMilSec = this.pipe.transform(milsec, 'SS');
    this.date_posted = myFormattedYear + '-' + myFormattedMonth + '-' + myFormattedDate +
      ' ' + myFormattedHour + ':' + myFormattedMin;
   /* const month = new Date().getMonth();
    const day = new Date().getDay();
    const year = new Date().getFullYear();
    const hour = new Date().getHours();
    const min = new Date().getMinutes();
    const milsec = new Date().getMilliseconds();
    this.date_posted = year + '-';
    if (month < 10) {
      this.date_posted += '0';
    }
    this.date_posted += month + '-';
    if (day < 10) {
      this.date_posted += '0';
    }
    this.date_posted += day + ' ' + hour + ':' + min;*/
    console.log(this.difficultyRating);
    console.log(this.interestRating);
    console.log(this.reviewText);
    console.log(this.tipsForSuccess);
    console.log(this.professor);
    console.log(this.courseId);
    console.log(this.date_posted);
    this.review = new NewReview();
    if (this.reviewText.length > 0) {
      this.review.difficulty_rating = this.difficultyRating;
      this.review.review_text = this.reviewText;
      this.review.interest_rating = this.interestRating;
      this.review.success_tips_text = this.tipsForSuccess;
      this.review.date_posted = this.date_posted;
      this.review.professor = this.professor;
      this.review.course = this.courseURL;
      this.activeModal.close('Modal Closed');
      this.reviewService.addNewReview(this.review);
      location.reload();
    }
  }
}
interface MyObj {
  count: number;
  next: string;
  previous: string;
  results: Array<string>;
}
