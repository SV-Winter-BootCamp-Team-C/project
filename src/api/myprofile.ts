// myprofile.ts
import { restFetcher } from '@/queryClient';

export const getIdAPI = async (id: number) => {
  const response = await restFetcher({
    method: 'GET',
    path: `/users/${id}`,
  });
  return response;
};
