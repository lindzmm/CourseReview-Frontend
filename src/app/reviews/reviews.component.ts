import { Component, OnInit, Input } from '@angular/core';
import { ReviewService } from '../services/review.service';
import { CourseService} from '../services/course.service';
import {ActivatedRoute, Router} from '@angular/router';
import { AddReviewComponent} from '../add-review/add-review.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Course} from '../course';
import { Review} from '../review';
import {DepartmentService} from '../services/department.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})

export class ReviewsComponent implements OnInit {
  dataSource = [];
  responseArray: string;
  responseArray2: string;
  reviewList = new Array<Review>();
  uuid: string;
  courseName: string;
  departmentId: number;
  courseNumber: number;
  departmentName: string;
  course: Course;

  constructor(private reviewService: ReviewService,
              private courseService: CourseService,
              private departmentService: DepartmentService,
              private route: ActivatedRoute,
              private router: Router,
              private modalService: NgbModal) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.uuid = params.id;
    });
    this.fetchReviews();
  }

  fetchReviews() {
    this.courseService.getSpecificCourse(this.uuid).subscribe((data: Array<object>) => {
      console.log('we got here');
      this.dataSource = data;
      this.responseArray = JSON.stringify(data);
      const obj: MyObj = JSON.parse(this.responseArray);
      const courseObj: string = JSON.stringify(obj);
      this.course = JSON.parse(courseObj);
      console.log('there are ' + this.course.course_reviews.length + ' reviews');
      for (const i of this.course.course_reviews) {
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
  onButtonClick(): void {
    const modalRef = this.modalService.open(AddReviewComponent);
    (modalRef.componentInstance).courseId = this.uuid;
    modalRef.result.then((result) => {
      console.log(result);
      this.courseService.newDataAdded.emit('new data added successfully');
    }).catch((error) => {
      console.log(error);
    });
  }
}

interface MyObj {
  count: number;
  next: string;
  previous: string;
  results: Array<string>;
}

class TempCourse {
  uuid: string;
  course_name: string;
  course_number: number;
  url: string;
  course_reviews: Array<string>;
}
