import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  API_URL  =  'http://localhost:8000';
  DEPARTMENT_ID: number;

  constructor(private  httpClient: HttpClient) { }
  getData(path) {
    return this.httpClient.get(`${path}`);
  }
  getSpecificDepartment(id) {
    this.DEPARTMENT_ID = id;
    return this.httpClient.get(`${this.API_URL}/department/${this.DEPARTMENT_ID}`);
  }
  getSubjects(pageNum, authToken): Observable<any> {
    const header = new HttpHeaders( { 'Content-Type': 'application/json', Authorization: 'Bearer ' + authToken});
    return this.httpClient.get(`https://api.madgrades.com/v1/subjects?page=${pageNum}`, {headers: header});
  }
  getMadGradesData(path, authToken): Observable<any> {
    const header = new HttpHeaders( { 'Content-Type': 'application/json', Authorization: 'Bearer ' + authToken});
    return this.httpClient.get(`${path}`, {headers: header});
  }
}
