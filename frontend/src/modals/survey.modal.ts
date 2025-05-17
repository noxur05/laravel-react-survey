import { IUser } from '../modals/user.modal';

export interface Option {
  uuid: string;
  text: string;
}

export interface QuestionData {
  options?: Option[];
}

export interface Question {
  id: number | string;
  type: QuestionType;
  question: string;
  description?: string | null;
  data?: QuestionData;
}

export type QuestionType = 'text' | 'radio' | 'checkbox' | 'select' | 'textarea' | string;


export interface SurveyForm {
  image?: string | File | null;
  image_url?: string;
  title: string;
  slug: string;
  status: boolean;
  description: string;
  created_at?: string;
  updated_at?: string;
  expire_date: string;
  questions?: Question[];
}

export interface Survey extends SurveyForm {
  id?: number;
}

export interface SurveyListItemProps {
  survey: Survey;
  key: number | string;
  onDeleteClick: () => void;
}

export interface StateContextType {
  currentUser: IUser;
  setCurrentUser: React.Dispatch<React.SetStateAction<IUser>>;
  userToken: string | null;
  setUserToken: React.Dispatch<React.SetStateAction<string | null>>;
  surveys: Survey[];
  setSurveys: React.Dispatch<React.SetStateAction<Survey[]>>;
  questionTypes: QuestionType[];
  setQuestionTypes: React.Dispatch<React.SetStateAction<QuestionType[]>>;
}