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
import {CourseOfferings, Cumulative, Grades, Instructors, Sections} from '../grades';

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
  courseOfferings: CourseOfferings;
  sections: Sections;
  instructors: Instructors;
  instructorList = new Array<string>();
  averageDifficultyRating: number;
  averageInterestRating: number;
  selectedProfessor: string;
  currentMGCourse: MadGradeCourse;
  selectedProfTotal: number;
  selectedProfA: number;
  selectedProfAB: number;
  selectedProfB: number;
  selectedProfBC: number;
  selectedProfC: number;
  selectedProfD: number;
  selectedProfF: number;
  selectedProfAvgGPA: number;

  constructor(private reviewService: ReviewService,
              private courseService: CourseService,
              private departmentService: DepartmentService,
              private route: ActivatedRoute,
              private router: Router,
              private modalService: NgbModal) {
  }

  ngOnInit() {
    this.averageDifficultyRating = 0;
    this.averageInterestRating = 0;
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
      console.log(review.difficulty_rating);
      console.log(review.interest_rating);
      console.log(review.professor);
      console.log(review.success_tips_text);
      this.averageDifficultyRating += review.difficulty_rating;
      this.averageInterestRating += review.interest_rating;
      this.reviewList.push(review);
    });
  }
  getDepartment(): void {
    this.departmentService
      .getMadGradesData('https://api.madgrades.com/v1/courses/' + this.uuid, '78218a4c7b7b49a6be7597692fca996f')
      .subscribe((data: Array<object>) => {
        const mgCourse: MadGradeCourse = JSON.parse(JSON.stringify(data));
        this.currentMGCourse = mgCourse;
        this.getGrades(mgCourse);
        this.getProfessors(mgCourse);
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
      .getMadGradesData(gradesURL, '78218a4c7b7b49a6be7597692fca996f')
      .subscribe((data: Array<object>) => {
        this.grade = JSON.parse(JSON.stringify(data));
        this.cumulative = JSON.parse(JSON.stringify(this.grade.cumulative));
        this.computeGPA();
        console.log('got this far!');
      });
  }
  computeGPA() {
    console.log('the selected professor is: ' + this.selectedProfessor);
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
  getProfessors(course: MadGradeCourse) {
    const gradesURL: string = course.gradesUrl;
    this.departmentService
      .getMadGradesData(gradesURL, '78218a4c7b7b49a6be7597692fca996f')
      .subscribe((data: Array<object>) => {
        this.grade = JSON.parse(JSON.stringify(data));
        this.courseOfferings = JSON.parse(JSON.stringify(this.grade.courseOfferings));
        let x = 0;
        while (!(this.courseOfferings[x] === undefined)) {
          this.sections = JSON.parse(JSON.stringify(this.courseOfferings[x].sections));
          let y = 0;
          while (!(this.sections[y] === undefined)) {
            this.instructors = JSON.parse(JSON.stringify(this.sections[y].instructors));
            let z = 0;
            while (!(this.instructors[z] === undefined)) {
              if (this.instructorList.length === 0) {
                this.instructorList.push(this.instructors[z].name);
              } else {
                if (!this.instructorList.includes(this.instructors[z].name)) {
                  this.instructorList.push(this.instructors[z].name);
                }
              }
              z++;
            }
            y++;
          }
          x++;
        }
        console.log(this.instructorList);
      });
  }
  selected() {
    this.selectedProfTotal = 0;
    this.selectedProfA = 0;
    this.selectedProfAB = 0;
    this.selectedProfB = 0;
    this.selectedProfBC = 0;
    this.selectedProfC = 0;
    this.selectedProfD = 0;
    this.selectedProfF = 0;
    console.log(this.selectedProfessor);
    const gradesURL: string = this.currentMGCourse.gradesUrl;
    this.departmentService
      .getMadGradesData(gradesURL, '78218a4c7b7b49a6be7597692fca996f')
      .subscribe((data: Array<object>) => {
        this.grade = JSON.parse(JSON.stringify(data));
        this.courseOfferings = JSON.parse(JSON.stringify(this.grade.courseOfferings));
        let x = 0;
        while (!(this.courseOfferings[x] === undefined)) {
          this.sections = JSON.parse(JSON.stringify(this.courseOfferings[x].sections));
          let y = 0;
          while (!(this.sections[y] === undefined)) {
            this.instructors = JSON.parse(JSON.stringify(this.sections[y].instructors));
            let z = 0;
            while (!(this.instructors[z] === undefined)) {
              if (this.instructors[z].name === this.selectedProfessor) {
                console.log(this.instructors[z].name);
                this.selectedProfTotal += this.sections[y].total;
                this.selectedProfA += this.sections[y].aCount;
                this.selectedProfAB += this.sections[y].abCount;
                this.selectedProfB += this.sections[y].bCount;
                this.selectedProfBC += this.sections[y].bcCount;
                this.selectedProfC += this.sections[y].cCount;
                this.selectedProfD += this.sections[y].dCount;
                this.selectedProfF += this.sections[y].fCount;
                // get cumGrades for the prof
              }
              z++;
            }
            y++;
          }
          x++;
        }
        let temp: number = 0;
        temp += (this.selectedProfA * 4);
        temp += (this.selectedProfAB * 3.5);
        temp += (this.selectedProfB * 3);
        temp += (this.selectedProfBC * 2.5);
        temp += (this.selectedProfC * 2);
        temp += (this.selectedProfD);
        this.selectedProfAvgGPA = temp / this.selectedProfTotal;
        this.selectedProfAvgGPA = Math.round(this.selectedProfAvgGPA * 1000) / 1000;
        console.log(this.selectedProfAvgGPA);
        // this.computeGPA();
        // console.log('got this far!');
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
