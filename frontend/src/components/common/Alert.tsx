import { useState } from 'react';
import Lottie from 'react-lottie';
import close from '../../assets/closebtn.svg';
import successAnimation from '../../assets/successAnimation.json';
import errorAnimation from '../../assets/errorAnimation.json';

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

  const handleCloseClick = () => {
    if (buttonClick) {
      buttonClick();
    }
    closeAlert();
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
          <div className="m-2">
            <Lottie
              options={{
                loop: false,
                autoplay: true,
                animationData: successAnimation,
                rendererSettings: {
                  preserveAspectRatio: 'xMidYMid slice',
                },
              }}
              height={35}
              width={35}
            />
          </div>
        ) : (
          <div className="m-2">
            <Lottie
              options={{
                loop: false,
                autoplay: true,
                animationData: errorAnimation,
                rendererSettings: {
                  preserveAspectRatio: 'xMidYMid slice',
                },
              }}
              height={35}
              width={35}
            />
          </div>
        )}
        <div className="flex items-center justify-center px-8">
          <p className="text-[0.875rem]">{message}</p>
        </div>
        <button
          type="submit"
          onClick={handleCloseClick}
          className="w-[6.25rem] h-9 rounded-[0.625rem] bg-purple text-base text-white mt-6 hover:bg-darkPurple transition duration-300 ease-in-out"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export default Alert;
