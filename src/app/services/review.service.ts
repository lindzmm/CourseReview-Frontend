import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  API_URL  =  'http://localhost:8000';
  REVIEW_URL: string;
  constructor(private  httpClient: HttpClient) { }
  getFirstPage(reviewURL) {
    this.REVIEW_URL = reviewURL.substr(1, reviewURL.length - 2);
    console.log(this.REVIEW_URL);
    return this.httpClient.get(`${this.REVIEW_URL}`);
  }
}
