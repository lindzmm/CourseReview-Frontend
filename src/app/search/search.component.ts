import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SearchService} from '../services/search.service';
import {Course} from '../course';
import {Subject} from '../subject';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchText: string;
  courseNumber: number;
  departmentPossibilities: Array<string> = [];
  department = '';
  courseName = '';
  inputArray: Array<string> = [];
  resultsList: Array<Course> = [];
   SubjectArray: Array<string> = ['Air Force Aerospace Studies', 'African Languages and Literature',
    'Afro-American Studies', 'Agricultural and Applied Economics', 'Biological Systems Engineering',
    'Life Sciences Communication', 'Agroecology', 'Agronomy', 'American Indian Studies', 'Anatomy', 'Anatomy & Physiology',
    'Anesthesiology', 'Anthropology', 'Art Department', 'Art Education (Department of Art)', 'Art History', 'Asian American Studies',
    'Asian Languages and Cultures', 'Asian Languages and Cultures: Languages', 'Astronomy', 'Microbiology',
    'Rehabilitation Psychology and Special Education', 'Biochemistry', 'Biology', 'Biology Core Curriculum',
    'Biomedical Engineering', 'Botany', 'Biostatistics and Medical Informatics', 'Cell and Regenerative Biology',
    'Chemical and Biological Engineering', 'Chemistry', 'Chicana/o and Latina/o Studies', 'Human Development and Family Studies',
    'General Business', 'Accounting and Information Systems', 'Finance, Investment and Banking', 'Information Systems',
    'International Business', 'Management and Human Resources', 'Marketing', 'Operations and Technology Management',
    'Real Estate and Urban Land Economics', 'Civil and Environmental Engineering', 'Risk Management and Insurance',
    'Actuarial Science', 'TRANSPORTATION AND PUBLIC UTILITIES', 'Classics', 'Civil Society and Community Studies',
    'Communication Arts', 'Communication Sciences and Disorders', 'Comparative Literature', 'Computer Sciences',
    'Counseling Psychology', 'Consumer Science', 'Curriculum and Instruction', 'Dairy Science', 'East Asian Languages and Literature',
    'Economics', 'East Asian Area Studies', 'Educational Leadership and Policy Analysis', 'Educational Policy Studies',
    'Educational Psychology', 'Electrical and Computer Engineering', 'Emergency Medicine', 'Engineering Mechanics and Astronautics',
    'Engineering Physics', 'Engineering Professional Development', 'ENGLISH', 'English as a Second Language', 'English',
    'Entomology', 'Design Studies', 'Environmental Studies - Gaylord Nelson Institute', 'Molecular and Environmental Toxicology Center',
    'Family Medicine', 'Farm & Industry Short Course', 'Folklore Program', 'Food Science', 'Forest and Wildlife Ecology',
    'French (French and Italian)', 'Genetics', 'Geography', 'Geological Engineering', 'Geoscience', 'German', 'German, Nordic, and Slavic',
    'Greek (Classics)', 'Obstetrics and Gynecology', 'HEBREW (HEBREW AND SEMITIC STUDIES)', 'Hebrew-Biblical', 'Hebrew-Modern',
    'History', 'Medical History and Bioethics', 'History of Science', 'FAMILY AND CONSUMER COMMUNICATIONS', 'Horticulture',
    'Human Oncology', 'Industrial and Systems Engineering', 'INDUSTRIAL RELATIONS', 'Interdisciplinary Courses (CALS)',
    'Integrated Arts', 'Interdisciplinary Courses (Engineering)', 'Interdisciplinary Courses (SOHE)', 'Integrated Liberal Studies',
    'Interdisciplinary Courses (L&S)', 'Integrated Science', 'Interdisciplinary Courses (L&S)', 'Integrated Science', 'International Studies',
    'Italian (French and Italian)', 'Jewish Studies', 'Journalism and Mass Communication', 'Landscape Architecture', 'Languages and Cultures of Asia',
    'Languages and Cultures of Asia - Languages', 'Latin (Classics)', 'Latin American, Caribbean, and Iberian Studies', 'Law',
    'Legal Studies', 'Library and Information Studies', 'Linguistics', 'Literature in Translation', 'Mathematics', 'Animal Sciences',
    'Mechanical Engineering', 'Medical Genetics', 'Medical Microbiology and Immunology', 'Medical Physics', 'Medical Sciences - Medical School',
    'Medical Sciences - Veterinary Medicine', 'CLINICAL LABORATORY SCIENCE', 'Medicine', 'Medieval Studies', 'Materials Science and Engineering',
    'Atmospheric and Oceanic Sciences', 'Military Science', 'Molecular Biology', 'Music', 'Music-Performance', 'Naval Science',
    'Neurology', 'Neurological Surgery', 'Neuroscience', 'Neuroscience Training Program', 'Nuclear Engineering', 'Collaborative Nursing Program',
    'Nursing', 'Nutritional Sciences', 'Occupational Therapy (Department of Kinesiology)', 'Oncology', 'Ophthalmology and Visual Sciences',
    'Patho-Biological Sciences', 'Pathology and Laboratory Medicine', 'Pediatrics', 'Pharmaceutical Sciences', 'Pharmacology',
    'Pharmacy', 'Pharmacy Practice', 'Social and Administrative Pharmacy', 'Philosophy', 'PHYSICAL EDUC ACTIVITY PROGM (DEPARTMENT OF KINES)',
    'Dance', 'Kinesiology', 'Physical Therapy', 'Physician Assistant Program', 'Physics', 'Biomolecular Chemistry', 'Physiology',
    'Plant Pathology', 'Political Science', 'Portuguese (Spanish and Portuguese)', 'Population Health Sciences', 'PROFESSIONAL ORIENTATION',
    'Psychiatry', 'Psychology', 'La Follette School of Public Affairs', 'Public Health', 'Radiology', 'Rehabilitation Medicine',
    'Religious Studies', 'Community and Environmental Sociology', 'Scandinavian Studies', 'Science and Technology Studies',
    'Senior Medical Program', 'Slavic (Slavic Languages)', 'Social Work', 'Sociology', 'Soil Science', 'Spanish (Spanish and Portuguese)',
    'Statistics', 'Comparative Biosciences', 'Surgery', 'Surgical Sciences', 'Therapeutic Science (Department of Kinesiology)',
    'Theatre and Drama', 'University Forum', 'Urban and Regional Planning', 'ANIMAL HEALTH AND BIOMEDICAL SCIENCES', 'WILDLIFE ECOLOGY',
    'Gender and Women’s Studies', 'Zoology', 'International Academic Programs - Study Abroad', 'Registrar-Administrative Use'];
   AbbrArray: Array<string> = ['A F AERO', 'AFRICAN', 'AFROAMER', 'A A E', 'BSE', 'LSC', 'AGROECOL', 'AGRONOMY', 'AMER IND',
    'ANATOMY', 'ANAT&PHY', 'ANESTHES', 'ANTHRO', 'ART', 'ART ED', 'ART HIST', 'ASIAN AM', 'ASIAN', 'ASIALANG',
    'ASTRON', 'MICROBIO', 'RP & SE', 'BIOCHEM', 'BIOLOGY', 'BIOCORE', 'B M E', 'BOTANY', 'B M I', 'CRB', 'CBE', 'CHEM', 'CHICLA',
    'HDFS', 'GEN BUS', 'ACCT I S', 'FINANCE', 'INFO SYS', 'INTL BUS', 'M H R', 'MARKETNG', 'OTM', 'REAL EST', 'CIV ENGR', 'R M I',
    'ACT SCI', 'TRAN P U', 'CLASSICS', 'CSCS', 'COM ARTS', 'CS&D', 'COMP LIT', 'COMP SCI', 'COUN PSY', 'CNSR SCI', 'CURRIC', 'DY SCI',
    'E ASIAN', 'ECON', 'E A STDS', 'ELPA', 'ED POL', 'ED PSYCH', 'E C E', 'EMER MED', 'E M A', 'E P', 'E P D', 'ENGLISH', 'ESL', 'ENGL',
    'ENTOM', 'DS', 'ENVIR ST', 'M&ENVTOX', 'FAM MED', 'FISC', 'FOLKLORE', 'FOOD SCI', 'F&W ECOL', 'FRENCH', 'GENETICS', 'GEOG', 'G L E', 'GEOSCI',
    'GERMAN', 'GNS', 'GREEK', 'OBS&GYN', 'HEBR ST', 'HEBR-BIB', 'HEBR-MOD', 'HISTORY', 'MED HIST', 'HIST SCI', 'FAM COM', 'HORT',
    'H ONCOL', 'I SY E', 'IND REL', 'INTER-AG', 'INTEGART', 'INTEREGR', 'INTER-HE', 'ILS', 'INTER-LS', 'INTEGSCI', 'INTER-LS', 'INTEGSCI',
    'INTL ST', 'ITALIAN', 'JEWISH', 'JOURN', 'LAND ARC', 'LCA', 'LCA LANG', 'LATIN', 'LACIS', 'LAW', 'LEGAL ST', 'L I S', 'LINGUIS',
    'LITTRANS', 'MATH', 'AN SCI', 'M E', 'MD GENET', 'M M & I', 'MED PHYS', 'MED SC-M', 'MED SC-V', 'CLNLABSC', 'MEDICINE', 'MEDIEVAL',
    'M S & E', 'ATM OCN', 'MIL SCI', 'MOL BIOL', 'MUSIC', 'MUS PERF', 'NAV SCI', 'NEUROL', 'NEURSURG', 'NEURODPT', 'NTP', 'N E', 'CNP',
    'NURSING', 'NUTR SCI', 'OCC THER', 'ONCOLOGY', 'OPHTHALM', 'PATH-BIO', 'PATH', 'PEDIAT', 'PHM SCI', 'PHMCOL-M', 'PHARMACY',
    'PHM PRAC', 'S&A PHM', 'PHILOS', 'PE ACTIV', 'DANCE', 'KINES', 'PHY THER', 'PHY ASST', 'PHYSICS', 'BMOLCHEM', 'PHYSIOL', 'PL PATH',
    'POLI SCI', 'PORTUG', 'POP HLTH', 'PRO OR', 'PSYCHIAT', 'PSYCH', 'PUB AFFR', 'PUBLHLTH', 'RADIOL', 'RHAB MED', 'RELIG ST', 'C&E SOC',
    'SCAND ST', 'STS', 'SR MED', 'SLAVIC', 'SOC WORK', 'SOC', 'SOIL SCI', 'SPANISH', 'STAT', 'COMP BIO', 'SURGERY', 'SURG SCI', 'THER SCI',
    'THEATRE', 'UNIV FOR', 'URB R PL', 'AHABS', 'WL ECOL', 'GEN&WS', 'ZOOLOGY', 'STDYABRD', 'AdminUse'];
  constructor(private route: ActivatedRoute,
              private searchService: SearchService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.searchText = params.id;
      this.departmentPossibilities = [];
      this.courseNumber = undefined;
      this.resultsList = [];
      this.getCourses();
    });
  }
  getCourses() {
    const regexStr = this.searchText.match(/[a-zA-Z ]+|[0-9]+(?:\.[0-9]+|)/g);
    console.log(regexStr);
    for (let x of regexStr) {
      let localPossibilities: Array<string> = [];
      if ('0123456789'.indexOf(x.charAt(0)) !== -1) {
        this.courseNumber = parseInt(x, 10);
        console.log(this.courseNumber + ' Is a number');
      } else {
        const splitStrings = x.match(/[a-zA-Z]+|[0-9]+(?:\.[0-9]+|)/g);
        console.log(splitStrings);
        for (let y in this.AbbrArray) {
          let included = true;
          let found = false;
          if (splitStrings.length < 1) {
            included = false;
          }
          if (!(this.SubjectArray[y].trim().toLowerCase() === x.trim().toLowerCase())) {
            included = false;
            // console.log(included);
            // console.log(this.SubjectArray[y].trim().toLowerCase());
            // console.log(x.trim().toLowerCase());
          } else {
            found = true;
            localPossibilities = [];
            console.log(localPossibilities + ' should be blank');
            localPossibilities.push(this.SubjectArray[y]);
            this.department = this.SubjectArray[y];
            console.log('The department is ' + localPossibilities);
            break;
          }
          if (included === false && found === false) {
            included = true;
            if (!(this.AbbrArray[y].trim().toLowerCase() === x.trim().toLowerCase())) {
              included = false;
              // console.log(this.AbbrArray[y].trim().toLowerCase());
              // console.log(x.trim().toLowerCase());
            } else {
              found = true;
              localPossibilities = [];
              console.log(localPossibilities + ' should be blank');
              localPossibilities.push(this.SubjectArray[y]);
              this.department = this.SubjectArray[y];
              console.log('The department is ' + localPossibilities);
              break;
            }
            if (included === false && found === false) {
              included = true;
              for (let z of splitStrings) {
                if (!(this.AbbrArray[y].trim().toLowerCase().includes(z.trim().toLowerCase()))) {
                  included = false;
                  // console.log(this.AbbrArray[y].trim().toLowerCase());
                  // console.log(z.trim().toLowerCase());
                }
              }
              if (included === true) {
                found = true;
                localPossibilities.push(this.SubjectArray[y]);
                console.log('The department is ' + localPossibilities);
              }
            }
            if (included === false && found === false) {
              included = true;
              for (let z of splitStrings) {
                if (!(this.SubjectArray[y].trim().toLowerCase().includes(z.trim().toLowerCase()))) {
                  included = false;
                  // console.log(this.AbbrArray[y].trim().toLowerCase());
                  // console.log(z.trim().toLowerCase());
                }
              }
              if (included === true) {
                found = true;
                localPossibilities.push(this.SubjectArray[y]);
                console.log('The department is ' + localPossibilities);
              }
            }
          }
        }
        for (let m of localPossibilities) {
          this.departmentPossibilities.push(m);
        }
        if (this.departmentPossibilities.length > 1) {
          this.department = x;
        }
        if (this.departmentPossibilities.length === 1) {
          this.department = this.departmentPossibilities[0];
        }
        // console.log('hi');
        // console.log(this.departmentPossibilities);
        // console.log(localPossibilities);
        if (this.departmentPossibilities.length === 0 && this.department === '') {
          // have not found department yet
          // then set the words equal to course name
          this.courseName = x;
          console.log('course name is : ' +  this.courseName);
        }
      }
    }
    this.callAPI();
  }
  callAPI() {
    console.log('department posibilities: ' + this.departmentPossibilities);
    console.log('department: ' + this.department);
    console.log('courseName: ' + name);
    console.log('courseNumber: ' + this.courseNumber);
    // TODO: fix the next part
    if (this.courseNumber === undefined && this.department !== '') {
      this.searchService.getDepartment(this.department)
        .subscribe((data: Array<object>) => {
          const obj: MyObj = JSON.parse(JSON.stringify(data));
          for (const i of obj.results) {
            const course: Course = JSON.parse(JSON.stringify(i));
            this.resultsList.push(course);
            console.log(course);
          }
          this.resultsList = this.resultsList.sort((a, b) => {
            if (a.course_number > b.course_number) {
              return 1;
            } else if (a.course_number < b.course_number) {
              return -1;
            } else {
              return 0;
            }
          });
          console.log(this.resultsList.length);
          // do something with this data
          // console.log(data);
        });
    } else if (this.courseNumber !== undefined && this.department !== '') {
      this.searchService.getDepartmentAndNumber(this.department, this.courseNumber)
        .subscribe((data: Array<object>) => {
          // do something with this data
          const obj: MyObj = JSON.parse(JSON.stringify(data));
          for (const i of obj.results) {
            const course: Course = JSON.parse(JSON.stringify(i));
            this.resultsList.push(course);
            console.log(course);
          }
          console.log(this.resultsList.length);
          console.log('with number');
          console.log(this.courseNumber);
          console.log(data);
        });
    }
    if (this.courseName !== '' && this.courseNumber === undefined && this.department === '') {
      this.searchService.getCourseName(this.courseName)
        .subscribe((data: Array<object>) => {
          // do something with this data
          const obj: MyObj = JSON.parse(JSON.stringify(data));
          for (const i of obj.results) {
            const course: Course = JSON.parse(JSON.stringify(i));
            this.resultsList.push(course);
            console.log(course);
          }
          console.log(this.resultsList.length);
          console.log('with number');
          console.log(this.courseNumber);
          console.log(data);
        });
    }
    // loop through this.departmentPossibilities
      // if course number if blank, search just for departments
      // if course number != blank, search for department and course
    // if course name != blank
      // search for course name
  }
  // add filters to search!!
  // then add to the search service to be able to filter for these things
}

interface MyObj {
  count: number;
  next: string;
  previous: string;
  results: Array<string>;
}
