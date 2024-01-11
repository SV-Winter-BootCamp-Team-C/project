import { useState } from 'react';
import close from '@/assets/closebtn.svg';

interface AlertProps {
  message: string;
  buttonText: string;
}

function Alert({ message, buttonText }: AlertProps) {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  const closeAlert = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20">
      <div className="relative h-40 w-80 flex flex-col items-center justify-center bg-white shadow-md rounded-[1.25rem]">
        <div className="absolute right-2 top-2">
          <div className="flex items-center justify-center w-6 h-6 cursor-pointer" onClick={closeAlert}>
            <img src={close} alt="close" className="w-2 h-2" />
          </div>
        </div>
        {message}
        <button
          type="submit"
          onClick={closeAlert}
          className="w-[6.25rem] h-9 rounded-[0.625rem] bg-purple text-base text-white mt-8"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export default Alert;
