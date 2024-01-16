import { restFetcher } from '@/queryClient';
import { QuestionDataForm, ResponseSubmit } from '@/types/questionData';

export const responseformAPI = async (surveyId: number): Promise<QuestionDataForm> => {
  const response = await restFetcher({
    method: 'GET',
    path: `/surveys/${surveyId}`,
  });
  return response;
};

export const responseSubmitAPI = async (surveyId: number, responseSubmit: ResponseSubmit) => {
  const response = await restFetcher({
    method: 'POST',
    path: `/surveys/${surveyId}`,
    body: responseSubmit,
  });
  return response;
};
