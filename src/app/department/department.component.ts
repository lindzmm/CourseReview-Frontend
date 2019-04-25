import { Component, OnInit } from '@angular/core';
import {DepartmentService} from '../services/department.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  responseArray: string;
  departmentList = new Array<Department>();
  selectedDepartment: Department;
  constructor(private departmentService: DepartmentService,
              private router: Router) { }

  ngOnInit() {
    this.fetchDepartments();
  }
  fetchDepartments(): void {
    this.departmentService.getFirstPage().subscribe((data: Array<object>) => {
      this.responseArray = JSON.stringify(data);
      const obj: MyObj = JSON.parse(this.responseArray);
      for (const i of obj.results) {
        const deptObj: string = JSON.stringify(i);
        const department: Department = JSON.parse(deptObj);
        this.departmentList.push(department);
      }
    });
  }
  onSelect(dept: Department): void {
    this.selectedDepartment = dept;
    console.log('selected department is ' + this.selectedDepartment.department_name);
    this.router.navigate(['/department', this.selectedDepartment.id]);
  }

}

interface MyObj {
  count: number;
  next: string;
  previous: string;
  results: Array<string>;
}
