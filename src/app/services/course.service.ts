import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {NewCourse} from '../newCourse';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  API_URL  =  'http://localhost:8000/api';
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
    return this.httpClient.post(`${this.API_URL}/course`, course)
      .subscribe(
        data => {
          console.log('POST request is successful', data);
        },
        error => {
          console.log('Error', error);
        }
      );
  }
  getMadGradesCourses(pageNum, subjectCode, authToken): Observable<any> {
    const header = new HttpHeaders( { 'Content-Type': 'application/json', Authorization: 'Bearer ' + authToken});
    return this.httpClient.get(`https://api.madgrades.com/v1/courses?page=${pageNum}&subject=${subjectCode}`, {headers: header});
  }
}
