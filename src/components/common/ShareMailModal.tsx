import React, { useState } from 'react';
import close from '@/assets/closebtn.svg';
import plus from '@/assets/plus.svg';
import { Scrollbars } from 'react-custom-scrollbars-2';

interface ShareMailModal {
  isVisible: boolean;
  onClose: () => void;
}

function ShareMailModal({ isVisible, onClose }: ShareMailModal) {
  const [email, setEmail] = useState('');
  const [emailsList, setEmailsList] = useState<string[]>([]);

  if (!isVisible) return null;

  // 이메일 입력 값이 변경될 때 호출될 함수
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  // '추가' 버튼을 눌렀을 때 호출될 함수
  const handleAddEmail = () => {
    if (email && !emailsList.includes(email)) {
      setEmailsList([...emailsList, email]); // 현재 이메일을 배열에 추가
      setEmail(''); // 입력 필드 초기화
    }
  };

  // 이메일 태그를 삭제할 때 호출될 함수
  const handleDeleteEmail = (emailToDelete: string) => {
    setEmailsList(emailsList.filter((emailItem) => emailItem !== emailToDelete));
  };

  // 이메일 태그를 렌더링할 함수
  const renderEmailTag = (emailInput: string, index: number) => (
    <div key={index} className="flex items-center bg-[#D9D9D9] rounded-full pl-2 pr-2 py-1 mr-2 mb-2">
      <span className="text-[1rem] leading-4 text-center font-normal mr-1">{emailInput}</span>
      <div className="flex justify-center w-[1.125rem] h-[1.125rem] rounded-[50%] bg-white">
        <button
          type="button"
          aria-label="Delete email"
          onClick={() => handleDeleteEmail(emailInput)}
          className="cursor-pointer"
        >
          <img src={close} alt="delete" />
        </button>
      </div>
    </div>
  );
  return (
    <div className="fixed z-10 inset-0 flex items-center justify-center bg-black bg-opacity-20">
      <div className="relative w-[30rem] h-[14.625rem]  flex flex-col items-center justify-start bg-white shadow-md rounded-[1.25rem]">
        <div className="absolute right-2 top-2">
          <div className="flex items-center justify-center w-6 h-6 cursor-pointer" onClick={onClose}>
            <img src={close} alt="close" className="w-2 h-2" />
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="flex justify-center items-center w-[12.5rem] h-4 my-6">
            <span className="text-[1.25rem] font-semibold">공유 이메일 입력</span>
          </div>
          <div className="flex flex-row justify-center">
            <div className="flex items-center w-[16.25rem] h-9 border-solid border-[#b4b4b4] border-[0.0625rem] rounded-[0.625rem]">
              <input
                type="email"
                required
                value={email} // input의 value를 state로 설정
                onChange={handleEmailChange} // input 값이 변경될 때 함수 연결
                placeholder="이메일을 입력해주세요."
                className="w-full h-full text-[1rem] text-black pl-[0.63rem] focus:outline-none"
              />
            </div>
            <button
              type="button"
              className="flex flex-row  justify-center items-center w-[6.25rem] h-9 ml-4 gap-1 bg-[#918DCA] rounded-[0.625rem] cursor-pointer  hover:bg-darkPurple shadow-lg transition duration-300 ease-in-out"
              onClick={handleAddEmail}
            >
              <div>
                <img src={plus} alt="plus" className="flex  w-4 h-4" />
              </div>
              <div>
                <span className="w-4 h-4 text-[1rem] leading-4 text-center text-white font-medium ">추가</span>
              </div>
            </button>
          </div>
          {/* 입력된 이메일들을 화면에 리스트로 표시 */}
          <Scrollbars className="border-solid border-white" style={{ marginTop: 8, height: 72 }}>
            <div className="flex w-[22.5rem] h-fit flex-wrap items-start justify-start m-2">
              {emailsList.map(renderEmailTag)}
            </div>
          </Scrollbars>
        </div>
        <div className="flex justify-center items-center py-2">
          <button
            type="button"
            className="flex items-center px-5 py-2  w-[6.25rem] h-9 bg-[#918DCA] rounded-[0.625rem] cursor-pointer  hover:bg-darkPurple shadow-lg transition duration-300 ease-in-out"
          >
            <span className="w-full h-4 text-[1rem]  text-center text-white font-medium">전송</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShareMailModal;
