import { restFetcher } from '../queryClient';

export const createSurveyAPI = async (formData: FormData) => {
  const response = await restFetcher({
    method: 'POST',
    path: '/surveys',
    body: formData,
  });

  return response.data;
};
