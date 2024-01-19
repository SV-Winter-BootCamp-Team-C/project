import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { LoginForm } from '../types/auth';
import { useAuthStore } from '../store/AuthStore';
import { ApiResponseError } from '../types/apiResponseError';
import Alert from '../components/common/Alert';
import { loginAPI } from '../api/login';
import fileImage from '../assets/file.png';
import emailIcon from '../assets/email.svg';
import passwordIcon from '../assets/password.svg';

function Login() {
  const navigate = useNavigate();
  const { setUserId, setLoginStatus } = useAuthStore();
  const [loginInfo, setLoginInfo] = useState<LoginForm>({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState<string>('');

  const {
    mutate: loginMutation,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: loginAPI,
    onSuccess: (data) => {
      setUserId(data.id);
      setLoginStatus(true);
    },
    onError: (error: AxiosError) => {
      const err = error as AxiosError<ApiResponseError>;
      setErrorMessage(err.response?.data?.message || '로그인에 실패했습니다.');
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation(loginInfo);
  };

  const isLoginButtonEnabled = () => {
    return loginInfo.email !== '' && loginInfo.password !== '';
  };

  return (
    <div className="flex items-center justify-center h-screen bg-custom-gradient">
      <div className="relative flex items-start w-[57.5rem] h-[45.25rem] rounded-[2.5rem] bg-custom-gradient-re shadow-lg">
        <div className="flex flex-col items-center justify-center w-full">
          <span className="text-[2rem] pt-[5rem] font-semibold text-center text-white">Form : Flex</span>
        </div>
        <div className="absolute bottom-[4.75rem] left-[3.5rem]">
          <img src={fileImage} alt="File" className="w-[21.25rem] h-[26.25rem]" />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center w-full">
            <div className="w-[35rem] h-[45.25rem] rounded-[2.5rem] bg-white shadow-lg flex flex-col items-center justify-center">
              <span className="text-[2rem] font-bold text-black">Login</span>
              <div className="pt-12">
                <div className="relative flex items-center w-[25rem] h-[3.75rem] mb-[1.25rem] rounded-[1.875rem] border-solid border-[0.00625rem] border-gray hover:border-[0.125rem] hover:border-darkGray">
                  <input
                    type="email"
                    name="email"
                    value={loginInfo.email}
                    onChange={handleInputChange}
                    required
                    placeholder="Email"
                    className="w-full mx-[1.875rem] py-2 text-base text-black focus:outline-none"
                  />
                  <img src={emailIcon} alt="Email" className="w-[2.25rem] h-[2.25rem] inline-block mr-[1.875rem]" />
                </div>

                <div className="flex items-center w-[25rem] h-[3.75rem] rounded-[1.875rem] border-solid border-[0.00625rem] border-gray hover:border-[0.125rem] hover:border-darkGray">
                  <input
                    type="password"
                    name="password"
                    value={loginInfo.password}
                    onChange={handleInputChange}
                    required
                    placeholder="Password"
                    className="w-full h-[3.75rem] text-base text-black pl-[1.875rem] focus:outline-none"
                  />
                  <img
                    src={passwordIcon}
                    alt="Password"
                    className="w-[2.25rem] h-[2.25rem] inline-block mr-[1.875rem]"
                  />
                </div>
              </div>
              <div className="pt-[2.5rem]">
                <button
                  type="submit"
                  className={`w-[12.5rem] h-[3.125rem] text-[1.25rem] text-white font-bold py-[0.9375rem] px-[3.75rem] rounded-[0.625rem] shadow-lg transition duration-300 ease-in-out ${
                    isLoginButtonEnabled() ? 'bg-purple hover:bg-darkPurple' : 'bg-gray cursor-not-allowed'
                  }`}
                >
                  로그인
                </button>
              </div>
              <button
                type="button"
                className="pt-[1.25rem] text-darkGray text-[1rem] underline hover:text-black transition duration-300 ease-in-out"
                onClick={() => navigate('/signup')}
              >
                회원가입
              </button>
              {isSuccess && (
                <Alert
                  type="success"
                  message="로그인이 완료되었습니다."
                  buttonText="확인"
                  buttonClick={() => navigate('/all', { replace: true })}
                />
              )}
              {isError && <Alert type="error" message={errorMessage} buttonText="확인" />}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
