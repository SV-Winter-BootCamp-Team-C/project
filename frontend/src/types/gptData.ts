export type GptRequest = {
  title: string;
  description: string;
  content: string;
  type: 'MULTIPLE_CHOICE' | 'CHECKBOX' | 'DROPDOWN' | null;
};

export type GptResponse = {
  content: string;
  choices: {
    option: string;
  }[];
};
