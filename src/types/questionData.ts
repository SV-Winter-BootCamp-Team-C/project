export type Choice = {
  choices_id: number;
  option: string;
  count: number;
};

export type Answer = {
  answer_id: number;
  content: string;
};

export type QuestionData = {
  question_id: number;
  type: 'MULTIPLE_CHOICE' | 'SUBJECTIVE_QUESTION' | 'CHECKBOX' | 'DROPDOWN';
  content: string;
  image_url: string;
  choices?: Choice[];
  answers?: Answer[];
};

export type ExtendedQuestionData = QuestionData & {
  objContent: number[];
  subContent: string;
};
