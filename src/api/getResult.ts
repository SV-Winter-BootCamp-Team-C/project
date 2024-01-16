import { restFetcher } from '@/queryClient';
import axios from 'axios';

export const getQuestionResultAPI = async (surveyId: number) => {
  const response = await restFetcher({
    method: 'GET',
    path: `/surveys/${surveyId}/results`,
  });
  return response;
};

export const getAnswerResultAPI = async (surveyId: number) => {
  const response = await restFetcher({
    method: 'GET',
    path: `/surveys/${surveyId}/list`,
  });
  return response;
};

export const getExcelDownloadAPI = async (surveyId: number) => {
  const response = await axios.get(`http://localhost:8000/api/surveys/downloadExcel/${surveyId}`, {
    responseType: 'blob',
  });
  return response;
};
