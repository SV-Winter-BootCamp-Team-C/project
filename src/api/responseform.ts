import { restFetcher } from '@/queryClient';
import { QuestionDataForm, ResponseSubmit } from '@/types/questionData';

export const responseformAPI = async (id: number): Promise<QuestionDataForm> => {
  const response = await restFetcher({
    method: 'GET',
    path: `/surveys/${id}`,
  });
  return response;
};

export const responseSubmitAPI = async (id: number, responseSubmit: ResponseSubmit) => {
  const response = await restFetcher({
    method: 'POST',
    path: `/surveys/${id}`,
    body: responseSubmit,
  });
  return response;
};
