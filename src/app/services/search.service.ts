import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  API_URL  =  'http://localhost:8000/api/course';
  constructor(private  httpClient: HttpClient) { }
  getDepartment(department) {
    return this.httpClient.get(`${this.API_URL}` + '?department=' + `${department}`);
  }
  getDepartmentAndNumber(department, num) {
    return this.httpClient.get(`${this.API_URL}` + '?department=' + `${department}` + '&course_number=' + `${num}`);
  }
  getCourseName(name) {
    return this.httpClient.get(`${this.API_URL}` + '?course_name=' + `${name}`);
  }
  getCheckedSearch(url) {
    return this.httpClient.get(`${this.API_URL}` + `${url}`);
  }
}
