import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import Lottie from 'react-lottie';
import Alert from '../components/common/Alert';
import { ApiResponseError } from '../types/apiResponseError';
import { SignupForm } from '../types/auth';
import { checkEmailAPI, singupAPI } from '../api/signup';
// import fileImage from '../assets/file.png';
import usernameIcon from '../assets/username.svg';
import emailIcon from '../assets/email.svg';
import passwordIcon from '../assets/password.svg';
import signUpAnimation from '../assets/signUpAnimation.json';
import logo from '../assets/logo.svg';

function Signup() {
  const navigate = useNavigate();
  const [signupInfo, setSignupInfo] = useState<SignupForm>({ name: '', email: '', password: '' });
  const [isCheckedEamil, setIsCheckedEmail] = useState<boolean>(false);
  const [isCheckEmailErrorMessage, setIsCheckEmailErrorMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const signUpOption = {
    loop: true, // or false, depending on your requirement
    autoplay: true, // or false
    animationData: signUpAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const { mutate: checkEmailMutation } = useMutation({
    mutationFn: checkEmailAPI,
    onSuccess: (data) => {
      if (data.exists) {
        setIsCheckEmailErrorMessage('이미 사용 중인 이메일입니다.');
        setIsCheckedEmail(false);
      } else {
        setIsCheckEmailErrorMessage('');
        setIsCheckedEmail(true);
      }
    },
    onError: (error: AxiosError) => {
      const err = error as AxiosError<ApiResponseError>;
      setErrorMessage(err.response?.data?.message || '이메일 중복 확인을 실패했습니다.');
    },
  });

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleCheckEmailClick = () => {
    // 이메일 형식이 유효하지 않으면 오류 메시지를 설정하고 함수를 종료
    if (!isValidEmail(signupInfo.email)) {
      setIsCheckEmailErrorMessage('유효한 이메일 형식이 아닙니다.');
      setIsCheckedEmail(false);
      return;
    }

    checkEmailMutation(signupInfo.email);
  };

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

    if (e.target.name === 'email') {
      setIsCheckedEmail(false);
      setIsCheckEmailErrorMessage('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isCheckedEamil) {
      setIsCheckEmailErrorMessage('이메일 중복 확인이 필요합니다.');
      return;
    }
    signupMutation(signupInfo);
  };

  const isSignupButtonEnabled = () => {
    return isCheckedEamil && signupInfo.name !== '' && signupInfo.password !== '';
  };

  return (
    <div className="flex items-center justify-center h-screen bg-custom-gradient">
      <div className="relative flex items-start w-[57.5rem] h-[45.25rem] rounded-[2.5rem] bg-custom-gradient-re shadow-lg">
        <div className="flex flex-col items-center justify-center w-full">
          <img src={logo} alt="logo" className="mt-[3rem] mb-[0.5rem] w-14 h-[3.75rem]" />
          <span className="text-[2rem] font-semibold text-center text-white">Form : Flex</span>
        </div>
        <div className="absolute bottom-[4.75rem] left-[-1em]">
          {/* <img src={fileImage} alt="File" className="w-[21.25rem] h-[26.25rem]" /> */}
          <Lottie options={signUpOption} height={450} width={400} />
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
                  <button
                    type="button"
                    className={`absolute text-xs font-semibold border-2 bg-white rounded-[1.25rem] py-1 px-2 border-solid ${
                      isCheckedEamil ? 'border-green-400 text-green-400' : 'border-red-400 text-red-400'
                    } cursor-pointer right-[20%]`}
                    onClick={handleCheckEmailClick}
                    disabled={isCheckedEamil || signupInfo.email === ''}
                  >
                    중복확인
                  </button>
                  {isCheckEmailErrorMessage && (
                    <Alert type="error" message={isCheckEmailErrorMessage} buttonText="확인" />
                  )}
                  {isCheckedEamil && <Alert type="success" message="사용 가능한 이메일입니다." buttonText="사용하기" />}
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
                  className={`w-[12.5rem] h-[3.125rem] text-[1.25rem] text-white font-bold py-[0.9375rem] px-[3.75rem] rounded-[0.625rem] shadow-lg transition duration-300 ease-in-out ${
                    isSignupButtonEnabled() ? 'bg-purple hover:bg-darkPurple' : 'bg-gray cursor-not-allowed'
                  }`}
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
