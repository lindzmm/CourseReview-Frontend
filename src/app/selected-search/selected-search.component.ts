import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SearchService} from '../services/search.service';
import {Course} from '../course';

@Component({
  selector: 'app-selected-search',
  templateUrl: './selected-search.component.html',
  styleUrls: ['./selected-search.component.css']
})
export class SelectedSearchComponent implements OnInit {
  searchText: string;
  searchURL: string;
  resultsList: Array<Course> = [];
  constructor(private route: ActivatedRoute,
              private searchService: SearchService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.searchText = params.id;
      this.searchURL = '?' + params.id;
      this.searchText = this.searchText.replace('&', ' ');
      this.searchText = this.searchText.replace('=', ': ');
      this.searchText = this.searchText.replace('+', ' ');
      while (this.searchText.includes('&')) {
        this.searchText = this.searchText.replace('&', ' ');
        this.searchText = this.searchText.replace('=', ': ');
        this.searchText = this.searchText.replace('+', ' ');
      }
      this.getCourses();
    });
  }
  getCourses() {
    this.searchService.getCheckedSearch(this.searchURL)
      .subscribe((data: Array<object>) => {
        // do something with this data
        const obj: MyObj = JSON.parse(JSON.stringify(data));
        for (const i of obj.results) {
          const course: Course = JSON.parse(JSON.stringify(i));
          this.resultsList.push(course);
          console.log(course);
        }
        console.log(data);
      });
    // do something
  }

}

interface MyObj {
  count: number;
  next: string;
  previous: string;
  results: Array<string>;
}

