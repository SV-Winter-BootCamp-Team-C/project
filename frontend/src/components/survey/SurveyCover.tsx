import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import participants from '../../assets/participants.svg';
import { calculateRemainingDays } from '../../utils/calculateRemainingDays';
import openIcon from '../../assets/open.svg';
import privateIcon from '../../assets/private.svg';
import { Survey } from '../../types/survey';
import noImage from '../../assets/noImage.png';
import { useAuthStore } from '../../store/AuthStore';
import SurveyCoverMenu from './SurveyCoverMenu';

function SurveyCover({
  surveyId,
  title,
  open,
  mainImageUrl,
  // createdAt,
  // updatedAt,
  deadline,
  // isAttended,
  attendCount,
}: Survey) {
  const navigate = useNavigate();
  const location = useLocation();
  const { textLabel, textColor } = calculateRemainingDays(deadline);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const myId = useAuthStore((state) => state.userId);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleNavigateToSurvey = () => {
    if (location.pathname.includes('/all')) {
      navigate(`/responseform?id=${surveyId}`);
    } else if (location.pathname.includes('/myform')) {
      navigate(`/responseform?id=${surveyId}`);
    } else if (location.pathname.includes('/myresponse')) {
      navigate(`/myanswer?userId=${myId}&surveyId=${surveyId}`);
    }
  };

  return (
    <div className="relative">
      <div
        className="inline-block w-80 h-[11.25rem] rounded-[0.625rem] border-2 border-solid border-darkGray cursor-pointer"
        onClick={handleNavigateToSurvey}
      >
        <img src={mainImageUrl || noImage} alt="survey" className="object-cover w-full h-full" />
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
          <div className="w-4 cursor-pointer" onClick={handleMenuClick}>
            <div className="flex flex-col items-center justify-center gap-[1px]">
              <div className="w-1 h-1 border border-solid rounded border-darkGary" />
              <div className="w-1 h-1 border border-solid rounded border-darkGary" />
              <div className="w-1 h-1 border border-solid rounded border-darkGary" />
            </div>
          </div>
          {isMenuOpen && <SurveyCoverMenu surveyId={surveyId} open={open} />}
        </div>
      </div>
    </div>
  );
}

export default SurveyCover;
