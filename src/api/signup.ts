import { restFetcher } from '@/queryClient';
import { SignupForm } from '@/types/auth';

export const singupAPI = async (data: SignupForm) => {
  const response = await restFetcher({
    method: 'POST',
    path: '/users/signup',
    body: data,
  });
  return response;
};

export interface CheckEmailResponse {
  email: string;
  exists: boolean;
}

export const checkEmailAPI = async (email: string): Promise<CheckEmailResponse> => {
  const response = await restFetcher({
    method: 'GET',
    path: `/users/${email}/check-email`,
  });
  return response;
};
