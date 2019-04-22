import { Component, OnInit } from '@angular/core';
import { CourseService } from '../services/course.service';
import { Router} from '@angular/router';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})

export class CoursesComponent implements OnInit {
  dataSource  = [];
  responseArray: string;
  courseList = new Array<Course>();
  selectedCourse: Course;


  constructor(private courseService: CourseService,
              private router: Router) { }

  ngOnInit() {
    this.fetchCourses();
  }

  fetchCourses() {
    this.courseService.getFirstPage().subscribe((data: Array<object>) => {
      this.dataSource  =  data;
      this.responseArray = JSON.stringify(data);
      const obj: MyObj = JSON.parse(this.responseArray);
      for (const i of obj.results) {
        const courseObj: string = JSON.stringify(i);
        const course: Course = JSON.parse(courseObj);
        this.courseList.push(course);
      }
    });
  }
  onSelect(course: Course): void {
    this.selectedCourse = course;
    console.log('selected course is ' + this.selectedCourse.course_name);
    this.router.navigate(['/courses', this.selectedCourse.id]);
  }
}

interface MyObj {
  count: number;
  next: string;
  previous: string;
  results: Array<string>;
}


