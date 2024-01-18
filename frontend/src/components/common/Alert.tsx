import { useState } from 'react';
import close from '@/assets/closebtn.svg';
import alertSuccess from '@/assets/alertSuccess.svg';
import alertError from '@/assets/alertError.svg';

interface AlertProps {
  type?: 'success' | 'error';
  message: string;
  buttonText: string;
  buttonClick?: () => void;
}

function Alert({ type, message, buttonText, buttonClick }: AlertProps) {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  const closeAlert = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-20">
      <div className="relative h-40 w-80 flex flex-col items-center justify-center bg-white shadow-md rounded-[1.25rem]">
        <div className="absolute right-2 top-2">
          <div className="flex items-center justify-center w-6 h-6 cursor-pointer" onClick={closeAlert}>
            <img src={close} alt="close" className="w-2 h-2" />
          </div>
        </div>
        {type === 'success' ? (
          <img src={alertSuccess} alt="success" className="w-8 h-8 mb-4" />
        ) : (
          <img src={alertError} alt="error" className="w-8 h-8 mb-4" />
        )}
        <p className="text-[0.875rem]">{message}</p>
        <button
          type="submit"
          onClick={buttonClick || closeAlert}
          className="w-[6.25rem] h-9 rounded-[0.625rem] bg-purple text-base text-white mt-6 hover:bg-darkPurple transition duration-300 ease-in-out"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export default Alert;
