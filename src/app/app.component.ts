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
      this.departmentService.getSubjects(curr, '78218a4c7b7b49a6be7597692fca996f')
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
  onSearch() {
    const searchText = (document.getElementById('search') as HTMLInputElement).value;
    console.log(searchText);
    this.router.navigate(['/search', searchText]);
  }
  onSelectSearch() {
    console.log((document.getElementById('Elementary') as HTMLInputElement).checked);
    const searchItems = new Array<string>();
    let newurl = '';
    if ((document.getElementById('Elementary') as HTMLInputElement).checked === true) {
      searchItems.push((document.getElementById('Elementary') as HTMLInputElement).value);
      newurl += '&level=Elementary';
    }
    if ((document.getElementById('Intermediate') as HTMLInputElement).checked === true) {
      searchItems.push((document.getElementById('Intermediate') as HTMLInputElement).value);
      newurl += '&level=Intermediate';
    }
    if ((document.getElementById('Advanced') as HTMLInputElement).checked === true) {
      searchItems.push((document.getElementById('Advanced') as HTMLInputElement).value);
      newurl += '&level=Advanced';
    }
    if ((document.getElementById('ComA') as HTMLInputElement).checked === true) {
      searchItems.push((document.getElementById('ComA') as HTMLInputElement).value);
      newurl += '&genEd=Com+A';
    }
    if ((document.getElementById('ComB') as HTMLInputElement).checked === true) {
      searchItems.push((document.getElementById('ComB') as HTMLInputElement).value);
      newurl += '&genEd=Com+B';
    }
    if ((document.getElementById('QRA') as HTMLInputElement).checked === true) {
      searchItems.push((document.getElementById('QRA') as HTMLInputElement).value);
      newurl += '&genEd=QR-A';
    }
    if ((document.getElementById('QRB') as HTMLInputElement).checked === true) {
      searchItems.push((document.getElementById('QRB') as HTMLInputElement).value);
      newurl += '&genEd=QR-B';
    }
    if ((document.getElementById('EthnicStudies') as HTMLInputElement).checked === true) {
      searchItems.push((document.getElementById('EthnicStudies') as HTMLInputElement).value);
      newurl += '&ethnicStudies=true';
    }
    if ((document.getElementById('Biological') as HTMLInputElement).checked === true) {
      searchItems.push((document.getElementById('Biological') as HTMLInputElement).value);
      newurl += '&breadth=Biological+Science';
    }
    if ((document.getElementById('Humanities') as HTMLInputElement).checked === true) {
      searchItems.push((document.getElementById('Humanities') as HTMLInputElement).value);
      newurl += '&breadth=Humanities';
    }
    if ((document.getElementById('Literature') as HTMLInputElement).checked === true) {
      searchItems.push((document.getElementById('Literature') as HTMLInputElement).value);
      newurl += '&breadth=Literature';
    }
    if ((document.getElementById('Natural') as HTMLInputElement).checked === true) {
      searchItems.push((document.getElementById('Natural') as HTMLInputElement).value);
      newurl += '&breadth=Natural+Science';
    }
    if ((document.getElementById('Physical') as HTMLInputElement).checked === true) {
      searchItems.push((document.getElementById('Physical') as HTMLInputElement).value);
      newurl += '&breadth=Physical+Science';
    }
    if ((document.getElementById('Social') as HTMLInputElement).checked === true) {
      searchItems.push((document.getElementById('Social') as HTMLInputElement).value);
      newurl += '&breadth=Social+Science';
    }
    if ((document.getElementById('Fall') as HTMLInputElement).checked === true) {
      searchItems.push((document.getElementById('Fall') as HTMLInputElement).value);
      newurl += '&typicallyOffered=Fall';
    }
    if ((document.getElementById('Spring') as HTMLInputElement).checked === true) {
      searchItems.push((document.getElementById('Spring') as HTMLInputElement).value);
      newurl += '&typicallyOffered=Spring';
    }
    if ((document.getElementById('Summer') as HTMLInputElement).checked === true) {
      searchItems.push((document.getElementById('Summer') as HTMLInputElement).value);
      newurl += '&typicallyOffered=Summer';
    }
    console.log(searchItems);
    this.router.navigate(['/search/checked', newurl]);
  }

  }

interface SubjectObj {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  nextPageUrl: string;
  results: Array<string>;
}
