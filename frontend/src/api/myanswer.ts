import { restFetcher } from '../queryClient';
import { QuestionDataForm } from '../types/questionData';

export const myAnswerAPI = async (userId: number, surveyId: number): Promise<QuestionDataForm> => {
  const response = await restFetcher({
    method: 'GET',
    path: `/surveys/${userId}/answers/${surveyId}`,
  });
  return response;
};
