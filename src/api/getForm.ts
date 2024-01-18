import { restFetcher } from '@/queryClient';

const LIMIT = 9;

interface AllSurveyResponse {
  userId: number;
  currentPage: number;
}

export const getAllSurveyAPI = async ({ userId, currentPage }: AllSurveyResponse) => {
  const response = await restFetcher({
    method: 'GET',
    path: `/surveys/${userId}/all`,
    params: { page: currentPage, limit: LIMIT },
  });
  return response;
};

export const getMySurveyAPI = async ({ userId, currentPage }: AllSurveyResponse) => {
  const response = await restFetcher({
    method: 'GET',
    path: `/surveys/${userId}/forms`,
    params: { page: currentPage, limit: LIMIT },
  });
  return response;
};

export const getMyResponseAPI = async ({ userId, currentPage }: AllSurveyResponse) => {
  const response = await restFetcher({
    method: 'GET',
    path: `/surveys/${userId}/join`,
    params: { page: currentPage, limit: LIMIT },
  });
  return response;
};
