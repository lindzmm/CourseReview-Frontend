import { Component, OnInit, Input } from '@angular/core';
import { ReviewService } from '../services/review.service';
import { CourseService} from '../services/course.service';
import {ActivatedRoute, Router} from '@angular/router';
import { AddReviewComponent} from '../add-review/add-review.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Course} from '../course';
import { Review} from '../review';
import {DepartmentService} from '../services/department.service';
import {MadGradeCourse} from '../madgradesCourse';
import {Subject} from '../subject';
import {Cumulative, Grades} from '../grades';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})

export class ReviewsComponent implements OnInit {
  dataSource = [];
  responseArray: string;
  reviewList = new Array<Review>();
  uuid: string;
  course: Course;
  subject: Subject;
  subjectList = new Array<Subject>();
  averageGPA: number;
  grade: Grades;
  cumulative: Cumulative;

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
    this.getDepartment();
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
  getDepartment(): void {
    this.departmentService
      .getMadGradesData('https://api.madgrades.com/v1/courses/' + this.uuid, '1b1c72ca7fe54e0cb959f2a8b0d718f6')
      .subscribe((data: Array<object>) => {
        const mgCourse: MadGradeCourse = JSON.parse(JSON.stringify(data));
        this.getGrades(mgCourse);
        console.log(mgCourse.name);
        for (const i of mgCourse.subjects) {
          this.subject = new Subject();
          this.subject = JSON.parse(JSON.stringify(i));
          console.log(this.subject.name);
          this.subjectList.push(this.subject);
        }
      });
  }
  getGrades(course: MadGradeCourse) {
    const gradesURL: string = course.gradesUrl;
    this.departmentService
      .getMadGradesData(gradesURL, '1b1c72ca7fe54e0cb959f2a8b0d718f6')
      .subscribe((data: Array<object>) => {
        this.grade = JSON.parse(JSON.stringify(data));
        this.cumulative = JSON.parse(JSON.stringify(this.grade.cumulative));
        this.computeGPA();
      });
  }
  computeGPA() {
    let temp: number = 0;
    temp += (this.cumulative.aCount * 4);
    temp += (this.cumulative.abCount * 3.5);
    temp += (this.cumulative.bCount * 3);
    temp += (this.cumulative.bcCount * 2.5);
    temp += (this.cumulative.cCount * 2);
    temp += (this.cumulative.dCount);
    const total: number = this.cumulative.aCount + this.cumulative.abCount + this.cumulative.bCount + this.cumulative.bcCount + this.cumulative.cCount + this.cumulative.dCount + this.cumulative.fCount;
    temp = (temp / total);
    temp = Math.round(temp * 1000) / 1000;
    this.averageGPA = temp;
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
