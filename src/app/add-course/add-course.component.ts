import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {NgForm} from '@angular/forms';
import { CourseService} from '../services/course.service';
import { NewCourse} from '../newCourse';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
  department: string;
  courseName: string;
  course: NewCourse;
  constructor(public activeModal: NgbActiveModal,
              private courseService: CourseService) { }

  ngOnInit() {
  }
  onSubmit(form: NgForm) {
    this.department = form.value.department;
    this.courseName = form.value.course_name;
    const courseNumber = form.value.course_number;
    console.log(this.department);
    console.log(this.courseName);
    console.log(courseNumber);
    this.course = new NewCourse();
    if (this.department.length > 0 && this.courseName.length > 0) {
      this.course.course_name = this.courseName;
      this.course.department = this.department;
      this.activeModal.close('Modal Closed');
      this.courseService.addNewCourse(this.course);
      location.reload();
    }
  }

}

