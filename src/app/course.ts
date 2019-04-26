export class Course {
  id: number;
  course_name: string;
  course_number: number;
  department: Department;
  url: string;
  course_reviews: Array<string>;
}
