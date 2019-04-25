import {Component, OnInit } from '@angular/core';
import { CourseService } from '../services/course.service';
import { Router} from '@angular/router';
import { AddCourseComponent } from '../add-course/add-course.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {DepartmentService} from '../services/department.service';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})

export class CoursesComponent implements OnInit {
  dataSource  = [];
  stringData = [];
  responseArray: string;
  departmentResponseArray: string;
  courseList = new Array<Course>();
  selectedCourse: Course;


  constructor(private courseService: CourseService,
              private router: Router,
              private modalService: NgbModal,
              private departmentService: DepartmentService) {
  }

  ngOnInit() {
    this.fetchCourses();
  }

  fetchCourses(): void {
    this.courseService.getFirstPage().subscribe((data: Array<object>) => {
      this.dataSource  =  data;
      this.responseArray = JSON.stringify(data);
      const obj: MyObj = JSON.parse(this.responseArray);
      for (const i of obj.results) {
        const courseObj: string = JSON.stringify(i);
        const course: Course = JSON.parse(courseObj);
        this.departmentService.getData(course.department).subscribe((newdata: Array<object>) => {
          this.departmentResponseArray = JSON.stringify(newdata);
          const dept: Department = JSON.parse(this.departmentResponseArray);
          course.department = dept.department_name;
        })
        this.courseList.push(course);
      }
    });
  }
  onSelect(course: Course): void {
    this.selectedCourse = course;
    console.log('selected course is ' + this.selectedCourse.course_name);
    this.router.navigate(['/courses', this.selectedCourse.id]);
  }
  onButtonClick(): void {
    const modalRef = this.modalService.open(AddCourseComponent);
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




