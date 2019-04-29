import {Component, OnInit } from '@angular/core';
import { CourseService } from '../services/course.service';
import {ActivatedRoute, Router} from '@angular/router';
import { AddCourseComponent } from '../add-course/add-course.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {DepartmentService} from '../services/department.service';
import { Course} from '../course';
import {Subject} from '../subject';
import {MadGradeCourse} from '../madgradesCourse';
import {NewCourse} from '../newCourse';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})

export class CoursesComponent implements OnInit {
  courseList = new Array<MadGradeCourse>();
  selectedCourse: MadGradeCourse;
  courseCode: number;
  dept: Department;
  subject: TempSub;
  pageNum: number;
  curr: number;
  newCourse: NewCourse;


  constructor(private courseService: CourseService,
              private router: Router,
              private modalService: NgbModal,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.courseCode = params.id;
      this.courseList.length = 0;
      this.fetchCourse();
    });
    // this.fetchDepartment();
  }
  fetchCourse(): void {
    this.courseService.getMadGradesCourses(1, this.courseCode, '1b1c72ca7fe54e0cb959f2a8b0d718f6')
      .subscribe((data: Array<object>) => {
        this.createCourse(data);
        this.curr = 2;
        while (this.curr <= this.pageNum) {
          this.courseService.getMadGradesCourses(this.curr, this.courseCode, '1b1c72ca7fe54e0cb959f2a8b0d718f6')
            .subscribe((newdata: Array<object>) => {
              this.createCourse(newdata);
            });
          this.curr++;
        }
      });
  }
  createCourse(data) {
    const course: CourseList = JSON.parse(JSON.stringify(data));
    console.log('course is ' + course.totalPages);
    this.pageNum = course.totalPages;
    console.log('pageNum ' + this.pageNum + ', curr ' + this.curr);
    for (const i of course.results) {
      const mgCourse: MadGradeCourse = JSON.parse(JSON.stringify(i));
      console.log(mgCourse);
      this.courseList.push(mgCourse);
      /*this.newCourse = new NewCourse();
      this.newCourse.course_number = mgCourse.number;
      this.newCourse.course_name = mgCourse.name;
      this.newCourse.uuid = mgCourse.uuid;
      this.courseService.addNewCourse(this.newCourse);*/
      for (const j of mgCourse.subjects) {
        const sub: TempSub = JSON.parse(JSON.stringify(j));
        if (sub.code === this.courseCode) {
          this.subject = sub;
          console.log('subject is ' + this.subject.name);
        }
      }
    }
    this.courseList = this.courseList.sort((a, b) => {
      if ( a.number > b.number) {
        return 1;
      } else if (a.number < b.number) {
        return -1;
      } else {
        return 0;
      }
    });
  }
  onSelect(course: MadGradeCourse): void {
    this.selectedCourse = course;
    console.log('selected course is ' + this.selectedCourse.name);
    this.router.navigate(['/courses', this.selectedCourse.uuid]);
  }
}


class CourseList {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  nextPageUrl: string;
  results: Array<string>;
}

class TempSub {
  'name': string;
  'abbreviation': string;
  'code': number;
}






