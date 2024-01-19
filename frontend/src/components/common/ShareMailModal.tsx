import React, { useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { shareSurveyAPI } from '../../api/surveyMenu';
import close from '../../assets/closebtn.svg';
import { ApiResponseError } from '../../types/apiResponseError';
import { AddButton, TextButton } from './Button';
import Alert from './Alert';
import Loading from './Loading';

interface ShareMailModal {
  surveyId: number;
  isVisible: boolean;
  onClose: () => void;
}

function ShareMailModal({ surveyId, isVisible, onClose }: ShareMailModal) {
  const [email, setEmail] = useState('');
  const [emailsList, setEmailsList] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [alertMessage, setAlertMessage] = useState<string>('');

  const {
    mutate: shareSurveyMutation,
    isError,
    isSuccess,
    isPending,
  } = useMutation({
    mutationFn: () => shareSurveyAPI(surveyId, emailsList),
    onError: (error: AxiosError) => {
      const err = error as AxiosError<ApiResponseError>;
      setAlertMessage(err.response?.data?.message || '설문 공유에 실패했습니다.');
    },
  });

  const handleShareSurvey = () => {
    if (emailsList.length === 0) {
      setErrorMessage('이메일을 입력해 주세요.');
      return;
    }
    shareSurveyMutation();
  };

  if (!isVisible) return null;

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setErrorMessage('');
  };

  const isValidEmail = (testEmail: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(testEmail);
  };

  const handleAddEmail = () => {
    if (!email) {
      setErrorMessage('이메일을 입력해 주세요.');
      return;
    }

    if (emailsList.includes(email)) {
      setErrorMessage('이미 추가된 이메일입니다.');
      return;
    }

    if (!isValidEmail(email)) {
      setErrorMessage('유효한 이메일 형식을 입력해 주세요.');
      return;
    }

    setEmailsList((prev) => [...prev, email]);
    setEmail('');
    setErrorMessage('');
  };

  const handleDeleteEmail = (emailToDelete: string) => {
    setEmailsList(emailsList.filter((emailItem) => emailItem !== emailToDelete));
  };

  // 이메일 태그를 렌더링할 함수
  const renderEmailTag = (emailInput: string, index: number) => (
    <div key={index} className="flex items-center gap-1 py-1 pl-1 pr-2 mt-1 mr-1 rounded-xl bg-lightGray">
      <div className="flex items-center justify-center w-[1.125rem] h-[1.125rem] rounded-[50%] bg-white">
        <button
          type="button"
          aria-label="Delete email"
          onClick={() => handleDeleteEmail(emailInput)}
          className="cursor-pointer"
        >
          <img src={close} alt="delete" className="w-2 h-2" />
        </button>
      </div>
      <p className="text-base font-normal leading-4 text-center">{emailInput}</p>
    </div>
  );

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-20">
      <div className="relative w-[30rem] h-64 flex flex-col items-center justify-start bg-white shadow-md rounded-[1.25rem]">
        <div className="absolute right-2 top-2">
          {isPending && <Loading />}
          <div className="flex items-center justify-center w-6 h-6 cursor-pointer" onClick={onClose}>
            <img src={close} alt="close" className="w-2 h-2" />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center">
          <div className="flex justify-center items-center w-[12.5rem] h-4 my-6">
            <span className="text-[1.25rem] font-semibold">공유 이메일 입력</span>
          </div>

          <div>
            <div className="flex flex-row justify-center gap-2">
              <div className="flex items-center w-[16.25rem] h-9 border-solid border-[#b4b4b4] border-[0.0625rem] rounded-[0.625rem]">
                <input
                  name="email"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                  placeholder="이메일을 입력해주세요."
                  className="w-full h-full text-[1rem] text-black pl-[0.63rem] focus:outline-none"
                />
              </div>
              <AddButton text="추가" onClick={handleAddEmail} />
            </div>
            {errorMessage && <p className="pt-1 text-xs text-red-500">{errorMessage}</p>}
          </div>

          <Scrollbars className="border-white border-solid" style={{ marginTop: 8, height: 72 }}>
            <div className="flex flex-wrap items-center justify-start m-2 h-fit">{emailsList.map(renderEmailTag)}</div>
          </Scrollbars>
        </div>

        <div className="flex items-center justify-center py-2">
          <TextButton text="전송" onClick={handleShareSurvey} />
        </div>
        {isError && <Alert type="error" message={alertMessage} buttonText="확인" />}
        {isSuccess && (
          <Alert type="success" message="설문이 공유되었습니다." buttonText="확인" buttonClick={() => onClose()} />
        )}
      </div>
    </div>
  );
}

export default ShareMailModal;
