export type RowData = {
  userId: number;
  createdAt: string;
  responses: string[];
};

export type ListData = {
  head: string[];
  rows: RowData[];
};

export type AnswerData = {
  title: string;
  list: ListData;
};
