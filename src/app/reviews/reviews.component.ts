import { Component, OnInit, Input } from '@angular/core';
import { ReviewService } from '../services/review.service';
import { CourseService} from '../services/course.service';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})

export class ReviewsComponent implements OnInit {
  dataSource = [];
  responseArray: string;
  reviewList = new Array<Review>();
  courseId: number;

  constructor(private reviewService: ReviewService,
              private courseService: CourseService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.courseId = params.id;
    });
    this.fetchReviews();
  }

  fetchReviews() {
    this.courseService.getSpecificCourse(this.courseId).subscribe((data: Array<object>) => {
      console.log('we got here');
      this.dataSource = data;
      this.responseArray = JSON.stringify(data);
      const obj: MyObj = JSON.parse(this.responseArray);
      const courseObj: string = JSON.stringify(obj);
      const course: Course = JSON.parse(courseObj);
      for (const i of course.course_reviews) {
        const reviewURL: string = JSON.stringify(i);
        console.log('this review url here is ' + reviewURL);
        this.fetchReviewDetails(reviewURL);
      }
    });
  }

  fetchReviewDetails(url) {
    this.reviewService.getFirstPage(url).subscribe((data: Array<object>) => {
      this.dataSource = data;
      console.log(data);
      this.responseArray = JSON.stringify(data);
      const review: Review = JSON.parse(this.responseArray);
      console.log(review.course);
      console.log(review.review_text);
      console.log(review.rating);
      this.reviewList.push(review);
    });
  }
}

interface MyObj {
  count: number;
  next: string;
  previous: string;
  results: Array<string>;
}
