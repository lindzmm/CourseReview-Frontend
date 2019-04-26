import {Component, OnInit } from '@angular/core';
import { CourseService } from '../services/course.service';
import {ActivatedRoute, Router} from '@angular/router';
import { AddCourseComponent } from '../add-course/add-course.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {DepartmentService} from '../services/department.service';
import { Course} from '../course';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})

export class CoursesComponent implements OnInit {
  responseArray: string;
  departmentResponseArray: string;
  courseList = new Array<Course>();
  selectedCourse: Course;
  departmentId: number;
  departmentName: string;
  dept: Department;
  course: Course;


  constructor(private courseService: CourseService,
              private router: Router,
              private modalService: NgbModal,
              private route: ActivatedRoute,
              private departmentService: DepartmentService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.departmentId = params.id;
    });
    this.fetchDepartment();
    // this.fetchCourses();
  }
  fetchDepartment(): void {
    this.departmentService.getSpecificDepartment(this.departmentId).subscribe((data: Array<object>) => {
      this.responseArray = JSON.stringify(data);
      this.dept = JSON.parse(this.responseArray);
      this.departmentName = this.dept.department_name;
      this.fetchCourses();
    });
  }
  fetchCourses(): void {
      console.log(this.dept.department_courses);
      this.course = new Course();
      for (const i of this.dept.department_courses) {
        console.log('inside loop ' + i);
        this.departmentService.getData(i).subscribe((newdata: Array<object>) =>{
          this.responseArray = JSON.stringify(newdata);
          const deptCourses: TempCourse = JSON.parse(this.responseArray);
          console.log(deptCourses);
          console.log(this.dept);
          this.course = new Course();
          this.departmentName = this.dept.department_name;
          this.course.id = deptCourses.id;
          this.course.url = deptCourses.url;
          this.course.course_name = deptCourses.course_name;
          this.course.course_reviews = deptCourses.course_reviews;
          this.course.department = this.dept;
          this.course.course_number = deptCourses.course_number;
          this.courseList.push(this.course);
        });
      }
  }
  onSelect(course: Course): void {
    this.selectedCourse = course;
    console.log('selected course is ' + this.selectedCourse.course_name);
    this.router.navigate(['/courses', this.selectedCourse.id]);
  }
  onButtonClick(): void {
    const modalRef = this.modalService.open(AddCourseComponent);
    (modalRef.componentInstance).department = this.dept;
    modalRef.result.then((result) => {
      console.log(result);
      this.courseService.newDataAdded.emit('new data added successfully');
    }).catch((error) => {
      console.log(error);
    });
  }
}

class TempCourse {
  id: number;
  course_name: string;
  course_number: number;
  department: string;
  url: string;
  course_reviews: Array<string>;
}





