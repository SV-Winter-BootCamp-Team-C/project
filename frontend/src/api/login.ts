import { restFetcher } from '../queryClient';
import { LoginForm } from '../types/auth';

export const loginAPI = async (data: LoginForm) => {
  const response = await restFetcher({
    method: 'POST',
    path: '/users/login',
    body: data,
  });
  return response;
};
