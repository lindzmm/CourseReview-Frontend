import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  API_URL  =  'http://localhost:8000';
  DEPARTMENT_ID: number;

  constructor(private  httpClient: HttpClient) { }

  getFirstPage() {
    return  this.httpClient.get(`${this.API_URL}/department`);
  }
  getData(path) {
    return this.httpClient.get(`${path}`);
  }
  getSpecificDepartment(id) {
    this.DEPARTMENT_ID = id;
    return this.httpClient.get(`${this.API_URL}/department/${this.DEPARTMENT_ID}`);
  }
}
