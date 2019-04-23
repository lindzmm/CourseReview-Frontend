import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  API_URL  =  'http://localhost:8000';
  COURSE_ID: number;
  constructor(private  httpClient: HttpClient) {}
  getFirstPage() {
    return  this.httpClient.get(`${this.API_URL}/course`);
  }
  getSpecificCourse(id) {
    this.COURSE_ID = id;
    return this.httpClient.get(`${this.API_URL}/course/${this.COURSE_ID}`);
  }
}
