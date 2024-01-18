export type Survey = {
  surveyId: number;
  title: string;
  open?: boolean;
  mainImageUrl?: string;
  createdAt: string;
  updatedAt: string;
  deadline: string;
  isAttended?: boolean;
  attendCount: number;
};

export type SurveyCoverType = {
  surveys: Survey[];
  sortedList?: Survey[];
  totalPages: number;
};
