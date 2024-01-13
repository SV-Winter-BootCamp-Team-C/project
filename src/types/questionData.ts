export type Choice = {
  choiceId: number;
  option: string;
  count?: number;
};

export type Answer = {
  answerId: number;
  content: string;
};

export type QuestionData = {
  questionId: number;
  type: 'MULTIPLE_CHOICE' | 'SUBJECTIVE_QUESTION' | 'CHECKBOX' | 'DROPDOWN';
  content: string;
  imageUrl: string;
  choices?: Choice[];
  answers?: Answer[];
};

export type ExtendedQuestionData = QuestionData & {
  objContent?: number[];
  subContent?: string;
};

type Questions = QuestionData[] | ExtendedQuestionData[];

export type QuestionDataForm = {
  surveyId: number;
  userName?: string;
  title: string;
  description: string;
  font: string;
  color: string;
  buttonStyle: 'angled' | 'smooth' | 'round'; // 각지게, 부드럽게, 동글게
  mainImageUrl: string;
  createdAt: string;
  deadline: string;
  questions: Questions;
};
