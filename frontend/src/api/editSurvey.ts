import { restFetcher } from '../queryClient';
import { EditableSurvey } from '../types/editableSurvey';

interface EditSurveyAPIProps {
  surveyId: number;
  editSurveyData: EditableSurvey;
}

export const editSurveyAPI = async ({ surveyId, editSurveyData }: EditSurveyAPIProps) => {
  const response = await restFetcher({
    method: 'PUT',
    path: `/surveys/${surveyId}`,
    body: editSurveyData,
  });

  return response.data;
};
