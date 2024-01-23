import { GptRequest } from '../types/gptData';
import { restFetcher } from '../queryClient';

export const addGptResponseAPI = async (request: GptRequest) => {
  const response = await restFetcher({
    method: 'GET',
    path: '/gpt-prompt',
    body: request,
  });
  return response;
};
