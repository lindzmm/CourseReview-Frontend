import { Component, OnInit, Input } from '@angular/core';
import { ReviewService } from '../services/review.service';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})

export class ReviewsComponent implements OnInit {
  dataSource  = [];
  responseArray: string;
  reviewList = new Array<Review>();

  constructor(private reviewService: ReviewService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params);
      console.log(params.id);
    })
    this.fetchReviews();
  }

  fetchReviews() {
    this.reviewService.getFirstPage().subscribe((data: Array<object>) => {
      this.dataSource  =  data;
      console.log(data);
      this.responseArray = JSON.stringify(data);
      const obj: MyObj = JSON.parse(this.responseArray);
      for (const i of obj.results) {
        const reviewObj: string = JSON.stringify(i);
        const review: Review = JSON.parse(reviewObj);
        this.reviewList.push(review);
        console.log(review.course);
        console.log(review.review_text);
        console.log(review.rating);
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
