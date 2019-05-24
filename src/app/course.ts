export class Course {
  uuid: string;
  url: string;
  course_name: string;
  course_number: number;
  department: Array<string>;
  course_reviews: Array<string>;
  credits: string;
  description: string;
  prereq: string;
  ethnicStudies: boolean;
  genEd: Array<string>;
  breadth: Array<string>;
  level: string;
  lasCredit: boolean;
  typicallyOffered: Array<string>;
}
