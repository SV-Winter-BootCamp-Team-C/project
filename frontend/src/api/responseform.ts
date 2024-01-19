import { restFetcher } from '../queryClient';
import { ResponseSubmit } from '../types/questionData';

export const responseformAPI = async (surveyId: number) => {
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
