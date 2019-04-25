import {Component, OnInit } from '@angular/core';
import { CourseService } from '../services/course.service';
import {ActivatedRoute, Router} from '@angular/router';
import { AddCourseComponent } from '../add-course/add-course.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {DepartmentService} from '../services/department.service';


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
    this.fetchDepartment()
    // this.fetchCourses();
  }
  fetchDepartment(): void {
    this.departmentService.getSpecificDepartment(this.departmentId).subscribe((data: Array<object>) => {
      this.responseArray = JSON.stringify(data);
      const dept: Department = JSON.parse(this.responseArray);
      console.log(dept.department_courses);
      for (const i of dept.department_courses) {
        console.log('inside loop ' + i);
        this.departmentService.getData(i).subscribe((newdata: Array<object>) =>{
          this.responseArray = JSON.stringify(newdata);
          const deptCourses: Course = JSON.parse(this.responseArray);
          this.departmentService.getData(deptCourses.department).subscribe((moredata: Array<object>) => {
            this.departmentResponseArray = JSON.stringify(moredata);
            const depart: Department = JSON.parse(this.departmentResponseArray);
            deptCourses.department = dept.department_name;
          });
          this.courseList.push(deptCourses);
        });
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




