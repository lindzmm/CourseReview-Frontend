import {EventEmitter, Injectable} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {NewCourse} from '../newCourse';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  API_URL  =  'http://localhost:8000';
  COURSE_ID: number;
  newDataAdded = new EventEmitter<string>();
  constructor(private  httpClient: HttpClient) {}
  getFirstPage() {
    return  this.httpClient.get(`${this.API_URL}/course`);
  }
  getSpecificCourse(id) {
    this.COURSE_ID = id;
    return this.httpClient.get(`${this.API_URL}/course/${this.COURSE_ID}`);
  }
  addNewCourse(course: NewCourse) {
    return this.httpClient.post(`${this.API_URL}/course/`, course)
      .subscribe(
        data => {
          console.log('POST request is successful', data);
        },
        error => {
          console.log('Error', error);
        }
      );
  }
}
