import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {CourseService} from '../services/course.service';
import {NgForm} from '@angular/forms';
import {NewReview} from '../newReview';
import {ReviewService} from '../services/review.service';
import {ActivatedRoute} from '@angular/router';
import { Course } from '../course';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent implements OnInit {
  rating: number;
  reviewText: string;
  course: Course;
  courseURL: string;
  review: NewReview;
  public courseId: number;

  constructor(public activeModal: NgbActiveModal,
              private reviewService: ReviewService,
              private route: ActivatedRoute,
              private courseService: CourseService) { }

  ngOnInit() {
  }


  onSubmit(form: NgForm) {
    this.rating = form.value.rating;
    this.reviewText = form.value.review_text;
    this.courseURL = 'http://localhost:8000/course/' + this.courseId;
    console.log(this.rating);
    console.log(this.reviewText);
    console.log(this.courseId);
    this.review = new NewReview();
    if (this.reviewText.length > 0) {
      this.review.rating = this.rating;
      this.review.review_text = this.reviewText;
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
