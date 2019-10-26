import { Course} from './course';

export class Review {
  url: string;
  course: Course;
  review_text: string;
  difficulty_rating: number;
  interest_rating: number;
  success_tips_text: string;
  date_posted: number;
  professor: string;
}
