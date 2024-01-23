import { restFetcher } from '../queryClient';
import { EditableSurvey } from '../types/editableSurvey';

export const createSurveyAPI = async (createSurveyData: EditableSurvey) => {
  const response = await restFetcher({
    method: 'POST',
    path: '/surveys',
    body: createSurveyData,
  });

  return response.data;
};
