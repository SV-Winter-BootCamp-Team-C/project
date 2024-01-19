import { restFetcher } from '../queryClient';

const LIMIT = 9;

interface AllSurveyResponse {
  userId: number;
  currentPage: number;
}

export const getAllSurveyAPI = async ({ userId, currentPage, title }: AllSurveyResponse & { title?: string }) => {
  const params: any = { page: currentPage, limit: LIMIT };
  if (title) params.title = title;
  const response = await restFetcher({
    method: 'GET',
    path: `/surveys/${userId}/all`,
    params,
  });
  return response;
};

export const getMySurveyAPI = async ({ userId, currentPage, title }: AllSurveyResponse & { title?: string }) => {
  const params: any = { page: currentPage, limit: LIMIT };
  if (title) params.title = title;
  const response = await restFetcher({
    method: 'GET',
    path: `/surveys/${userId}/forms`,
    params,
  });
  return response;
};

export const getMyResponseAPI = async ({ userId, currentPage, title }: AllSurveyResponse & { title?: string }) => {
  const params: any = { page: currentPage, limit: LIMIT };
  if (title) params.title = title;
  const response = await restFetcher({
    method: 'GET',
    path: `/surveys/${userId}/join`,
    params,
  });
  console.log(params);
  return response;
};
