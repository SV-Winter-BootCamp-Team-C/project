import { GptRequest } from '../types/gptData';
import { restFetcher } from '../queryClient';

export const addGptResponseAPI = async (request: GptRequest) => {
  const response = await restFetcher({
    method: 'POST',
    path: '/gpt-prompt',
    body: request,
  });
  console.log(response);
  return response;
};
