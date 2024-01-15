import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import Alert from '@/components/common/Alert';
import { ApiResponseError } from '@/types/apiResponseError';
import { SignupForm } from '@/types/auth';
import { useNavigate } from 'react-router-dom';
import { singupAPI } from '@/api/signup';
import { AxiosError } from 'axios';
import fileImage from '../assets/file.png';
import usernameIcon from '../assets/username.svg';
import emailIcon from '../assets/email.svg';
import passwordIcon from '../assets/password.svg';

function Signup() {
  const navigate = useNavigate();
  const [signupInfo, setSignupInfo] = useState<SignupForm>({ name: '', email: '', password: '' });
  // const [isCheckedEamil, setIsCheckedEmail] = useState<boolean>(false); // 이메일 중복 확인 체크
  const [errorMessage, setErrorMessage] = useState<string>('');

  // const {
  //   data,
  //   refetch: checkEmail,
  //   isError: isCheckEmailError,
  //   isSuccess: isCheckEmailSuccess,
  // } = useQuery<CheckEmailResponse, AxiosError>({
  //   queryKey: ['checkEmail', signupInfo.email],
  //   queryFn: () => checkEmailAPI(signupInfo.email),
  //   enabled: false,
  // });

  // const handleCheckEmailClick = () => {
  //   if (!signupInfo.email) {
  //     <Alert type="error" message="이메일을 입력해주세요." buttonText="확인" />;
  //   }
  //   checkEmail();
  // };

  const {
    mutate: signupMutation,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: singupAPI,
    onError: (error: AxiosError) => {
      const err = error as AxiosError<ApiResponseError>;
      setErrorMessage(err.response?.data?.message || '회원가입에 실패했습니다.');
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupInfo({ ...signupInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signupMutation(signupInfo);
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
          <div className="flex justify-end w-full">
            <div className="w-[35rem] h-[45.25rem] rounded-[2.5rem] bg-white shadow-lg flex flex-col items-center">
              <span className="pt-[9.25rem] text-[2rem] font-bold text-black">Signup</span>
              <div className="pt-12">
                <div className="flex items-center w-[25rem] h-[3.75rem] mb-[1.25rem] rounded-[1.875rem] border-solid border-[0.00625rem] border-gray hover:border-[0.125rem] hover:border-darkGray">
                  <input
                    type="text"
                    name="name"
                    value={signupInfo.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Username"
                    className="w-full mx-[1.875rem] py-2 text-base text-black focus:outline-none"
                  />
                  <img
                    src={usernameIcon}
                    alt="Username"
                    className="w-[2.25rem] h-[2.25rem] inline-block mr-[1.875rem]"
                  />
                </div>

                <div className="relative flex items-center w-[25rem] h-[3.75rem] mb-[1.25rem] rounded-[1.875rem] border-solid border-[0.00625rem] border-gray hover:border-[0.125rem] hover:border-darkGray">
                  <input
                    type="email"
                    name="email"
                    value={signupInfo.email}
                    onChange={handleInputChange}
                    required
                    placeholder="Email"
                    className="w-full mx-[1.875rem] py-2 text-base text-black focus:outline-none"
                  />
                  <img src={emailIcon} alt="Email" className="w-[2.25rem] h-[2.25rem] inline-block mr-[1.875rem]" />
                  {/* <button
                    type="button"
                    className={`absolute text-xs font-semibold border-2 bg-white rounded-[1.25rem] py-1 px-2 border-solid ${
                      isCheckedEamil ? 'border-green-400 text-green-400' : 'border-red-400 text-red-400'
                    } cursor-pointer right-[20%] ${isCheckedEamil && 'hidden'}`}
                    onClick={handleCheckEmailClick}
                  >
                    중복확인
                  </button>
                  {isCheckEmailError && (
                    <Alert type="error" message="이메일 중복 확인에 실패했습니다." buttonText="확인" />
                  )}
                  {isCheckEmailSuccess || data?.exists === false ? (
                    <Alert type="success" message="사용 가능한 이메일입니다." buttonText="사용하기" />
                  ) : (
                    <Alert type="error" message="이미 사용중인 이메일입니다." buttonText="확인" />
                  )} */}
                </div>
                <div className="flex items-center w-[25rem] h-[3.75rem] rounded-[1.875rem] border-solid border-[0.00625rem] border-gray hover:border-[0.125rem] hover:border-darkGray">
                  <input
                    type="password"
                    name="password"
                    value={signupInfo.password}
                    onChange={handleInputChange}
                    required
                    placeholder="Password"
                    className="w-full text-base text-black mx-[1.875rem] focus:outline-none"
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
                  className="w-[12.5rem] h-[3.125rem] text-[1.25rem] bg-purple text-white font-bold py-[0.9375rem] px-[3.75rem] rounded-[0.625rem] hover:bg-darkPurple shadow-lg transition duration-300 ease-in-out"
                >
                  회원가입
                </button>
              </div>
              {isSuccess && (
                <Alert
                  type="success"
                  message="회원가입이 완료되었습니다."
                  buttonText="확인"
                  buttonClick={() => navigate('/login')}
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

export default Signup;
