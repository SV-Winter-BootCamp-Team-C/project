import { restFetcher } from '../queryClient';

export const imageSearchAPI = async (query: string, perPage: number = 5) => {
  const response = await restFetcher({
    method: 'GET',
    path: `/images/search/${encodeURIComponent(query)}`,
    params: { perPage }, // URL 쿼리 파라미터
  });

  return response;
};
