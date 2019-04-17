import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  API_URL  =  'http://localhost:8000';
  constructor(private  httpClient: HttpClient) {}
  getFirstPage(){
    return  this.httpClient.get(`${this.API_URL}/course`);
  }
}
