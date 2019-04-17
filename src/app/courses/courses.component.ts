import { Component, OnInit } from '@angular/core';
import { CourseService } from '../services/course.service';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})

export class CoursesComponent implements OnInit {
  dataSource  = [];
  responseArray: string;
  courseList = new Array<Course>();


  constructor(private courseService: CourseService) { }

  ngOnInit() {
    this.fetchCourses();
  }

  fetchCourses() {
    this.courseService.getFirstPage().subscribe((data: Array<object>) => {
      this.dataSource  =  data;
      console.log(data);
      this.responseArray = JSON.stringify(data);
      console.log('the string is' + this.responseArray);
      const obj: MyObj = JSON.parse(this.responseArray);
      console.log('the number is ' + obj.results.length);
      for (const i of obj.results) {
        const courseObj: string = JSON.stringify(i);
        const course: Course = JSON.parse(courseObj);
        console.log(course.course_name);
        console.log(course.department);
        console.log(course.url);
        this.courseList.push(course);
        console.log('length is ' + this.courseList.length);
      }
    });
  }
}

interface MyObj {
  count: number;
  next: string;
  previous: string;
  results: Array<string>;
}


