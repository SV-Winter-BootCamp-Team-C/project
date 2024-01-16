import { restFetcher } from '@/queryClient';

export const getQuestionResultAPI = async (surveyId: string) => {
  const response = await restFetcher({
    method: 'GET',
    path: `/surveys/${surveyId}/results`,
  });
  return response;
};

export const getAnswerResultAPI = async (surveyId: string) => {
  const response = await restFetcher({
    method: 'GET',
    path: `/surveys/${surveyId}/list`,
  });
  return response;
};
