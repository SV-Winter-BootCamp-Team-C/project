export type Survey = {
  surveyId: number;
  title: string;
  open?: boolean;
  mainImageUrl: string;
  createdAt: string;
  updatedAt: string;
  deadline: string;
  isAttended?: boolean;
  attedCount: number;
};

export type SurveyCover = {
  surveys: Survey[];
  totalPages: number;
};
