import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IoMdMore } from 'react-icons/io';
import participants from '../../assets/participants.svg';
import { calculateRemainingDays } from '../../utils/calculateRemainingDays';
import openIcon from '../../assets/open.svg';
import privateIcon from '../../assets/private.svg';
import { Survey } from '../../types/survey';
import noImage from '../../assets/noImage.png';
import { useAuthStore } from '../../store/AuthStore';
import SurveyCoverMenu from './SurveyCoverMenu';
import Alert from '../common/Alert';

function SurveyCover({
  surveyId,
  title,
  open,
  mainImageUrl,
  // createdAt,
  // updatedAt,
  deadline,
  isAttended,
  attendCount,
}: Survey) {
  const navigate = useNavigate();
  const location = useLocation();
  const { textLabel, textColor } = calculateRemainingDays(deadline);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [errorMessages, setErrorMessages] = useState<string>('');
  const myId = useAuthStore((state) => state.userId);

  const handleMenuClick = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const handleNavigateToSurvey = () => {
    if (location.pathname.includes('/all')) {
      if (textLabel === '마감') {
        setErrorMessages('마감된 설문입니다.');
        return;
      }
      if (isAttended) {
        setErrorMessages('이미 참여한 설문입니다.');
        return;
      }

      navigate(`/responseform?id=${surveyId}`);
    } else if (location.pathname.includes('/myform')) {
      navigate(`/view?id=${surveyId}`);
    } else if (location.pathname.includes('/myresponses')) {
      navigate(`/myanswer?userId=${myId}&surveyId=${surveyId}`);
    }
  };

  return (
    <div className="relative cursor-pointer">
      <div
        className="flex items-center justify-center w-[21.5rem] h-[11.25rem] border-2 border-solid border-darkGray rounded-[0.625rem] overflow-hidden"
        onClick={handleNavigateToSurvey}
      >
        <img
          src={mainImageUrl || noImage}
          alt="survey"
          className="block object-cover w-[21.5rem] h-[11.25rem] rounded-[0.625rem]"
        />
      </div>

      <div className="flex items-center justify-between px-3 pt-[0.625rem]">
        <div
          className="w-40 text-base font-medium text-left text-black truncate cursor-pointer"
          onClick={handleNavigateToSurvey}
        >
          {title}
        </div>
        <div className="flex items-center gap-3">
          {location.pathname !== '/all' && <img src={open ? openIcon : privateIcon} alt={open ? 'Open' : 'Private'} />}
          <span className={`${textColor} text-xs leading-3`}>{textLabel}</span>
          <div className="flex items-center gap-1">
            <img src={participants} alt="participants" className="w-[0.625rem] h-3 align-middle" />
            <span className="text-xs leading-3 text-darkGary">{attendCount}</span>
          </div>
          <button type="button" className="w-4 cursor-pointer" onClick={handleMenuClick} aria-label="More options">
            <IoMdMore />
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <SurveyCoverMenu
          surveyId={surveyId}
          open={open}
          attendCount={attendCount}
          isDropdownOpen={isMenuOpen}
          setIsDropdownOpen={setIsMenuOpen} // Pass down the state setter function
        />
      )}
      {errorMessages && (
        <Alert type="error" message={errorMessages} buttonText="확인" buttonClick={() => setErrorMessages('')} />
      )}
    </div>
  );
}

export default SurveyCover;
