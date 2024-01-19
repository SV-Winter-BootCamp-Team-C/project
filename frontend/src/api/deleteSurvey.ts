import { restFetcher } from '../queryClient';

export const deleteSurveyAPI = async (surveyId: number, userId: number) => {
  const response = await restFetcher({
    method: 'DELETE',
    path: `/surveys/${surveyId}`,
    body: { userId, surveyId },
  });
  return response;
};
