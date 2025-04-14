export interface Option {
  uuid: string;
  text: string;
}

export interface QuestionData {
  options?: Option[];
}

export interface Question {
  id: number;
  type: string;
  question: string;
  description: string | null;
  data?: QuestionData | undefined[];
}

export interface Survey {
  id: number;
  image_url: string;
  title: string;
  slug: string;
  status: boolean;
  description: string;
  created_at: string;
  updated_at: string;
  expire_date: string;
  questions?: Question[];
}

export interface SurveyListItemProps {
    survey: Survey;
    key: number | string;
    onDeleteClick: () => void;
}