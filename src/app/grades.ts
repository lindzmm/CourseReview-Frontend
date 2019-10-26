export class Grades {
  'courseUuid': string;
  'cumulative': Array<string>;
  'courseOfferings': Array<string>;
}
export class Cumulative {
  'total': number;
  'aCount': number;
  'abCount': number;
  'bCount': number;
  'bcCount': number;
  'cCount': number;
  'dCount': number;
  'fCount': number;
  'sCount': number;
  'uCount': number;
  'crCount': number;
  'nCount': number;
  'pCount': number;
  'iCount': number;
  'nwCount': number;
  'nrCount': number;
  'otherCount': number;
}
export class CourseOfferings {
  'termCode': number;
  'cumulative': Cumulative;
  'sections': Array<string>;
}
export class Sections {
  'sectionNumber': number;
  'instructors': Array<string>;
  'total': number;
  'aCount': number;
  'abCount': number;
  'bCount': number;
  'bcCount': number;
  'cCount': number;
  'dCount': number;
  'fCount': number;
  'sCount': number;
  'uCount': number;
  'crCount': number;
  'nCount': number;
  'pCount': number;
  'iCount': number;
  'nwCount': number;
  'nrCount': number;
  'otherCount': number;
}
export class Instructors {
  'id': number;
  'name': string;
}
