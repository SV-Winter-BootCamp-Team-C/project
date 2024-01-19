import { restFetcher } from '../queryClient';

export const shareSurveyAPI = async (surveyId: number, emails: string[]) => {
  const response = await restFetcher({
    method: 'POST',
    path: `/surveys/${surveyId}/share`,
    body: { emails },
  });
  return response;
};
