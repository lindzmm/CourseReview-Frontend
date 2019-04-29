import {Component, OnInit} from '@angular/core';
import {DepartmentService} from './services/department.service';
import {Router} from '@angular/router';
import {Subject} from './subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'SampleClassFrontEnd';
  subjectList = new Array<Subject>();
  selectedDepartment: Subject;
  constructor(private departmentService: DepartmentService,
              private router: Router) { }

  ngOnInit() {
    this.fetchDepartments();
  }

  fetchDepartments(): void {
    let pageNum = 9;
    let curr = 1;
    while (curr <= pageNum) {
      this.departmentService.getSubjects(curr, '1b1c72ca7fe54e0cb959f2a8b0d718f6')
        .subscribe((data: Array<object>) => {
        const sub: SubjectObj = JSON.parse(JSON.stringify(data));
        console.log(sub);
        pageNum = sub.totalPages;
        for (const i of sub.results) {
          const subject: Subject = JSON.parse(JSON.stringify(i));
          this.subjectList.push(subject);
        }
        this.subjectList = this.subjectList.sort((a, b) => {
          if ( a.name > b.name) {
            return 1;
          } else if (a.name < b.name) {
            return -1;
          } else {
            return 0;
          }
        });
      });
      console.log('here1');
      curr++;
    }
  }
  onSelect(dept: Subject): void {
    this.selectedDepartment = dept;
    console.log('selected department is ' + this.selectedDepartment.name);
    this.router.navigate(['/department', this.selectedDepartment.code]);
  }

  }

interface SubjectObj {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  nextPageUrl: string;
  results: Array<string>;
}
