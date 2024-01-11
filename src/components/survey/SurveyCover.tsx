import survey from '@/assets/surveyDefault.png';
import participants from '@/assets/participants.svg';
import { calculateRemainingDays } from '@/utils/calculateRemainingDays';
import { useState } from 'react';
import openIcon from '@/assets/open.svg';
import privateIcon from '@/assets/private.svg';
import { useLocation } from 'react-router-dom';
import SurveyCoverMenu from './SurveyCoverMenu';

interface SurveyCoverProps {
  title: string;
  mainImageUrl: string;
  deadline: string;
  attedCount: number;
  open?: boolean; // 공개 여부
}

function SurveyCover({ title, mainImageUrl, deadline, attedCount, open = false }: SurveyCoverProps) {
  const location = useLocation();
  const imageUrl = mainImageUrl || survey;
  const { textLabel, textColor } = calculateRemainingDays(deadline);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative">
      <div className="inline-block w-80 h-[11.25rem] rounded-[0.625rem] border-2 border-solid border-darkGray">
        <img src={imageUrl} alt="survey" className="object-cover w-full h-full" />
      </div>

      <div className="flex items-center justify-between px-3 pt-[0.625rem]">
        <div className="w-40 text-base font-medium text-left text-black truncate">{title}</div>
        <div className="flex items-center gap-3">
          {location.pathname !== '/all' && <img src={open ? openIcon : privateIcon} alt={open ? 'Open' : 'Private'} />}
          <span className={`${textColor} text-xs leading-3`}>{textLabel}</span>
          <div className="flex items-center gap-1">
            <img src={participants} alt="participants" className="w-[0.625rem] h-3 align-middle" />
            <span className="text-xs leading-3 text-darkGary">{attedCount}</span>
          </div>
          <div className="w-4 cursor-pointer" onClick={handleMenuClick}>
            <div className="flex flex-col items-center justify-center gap-[1px]">
              <div className="w-1 h-1 border border-solid rounded border-darkGary" />
              <div className="w-1 h-1 border border-solid rounded border-darkGary" />
              <div className="w-1 h-1 border border-solid rounded border-darkGary" />
            </div>
          </div>
          {isMenuOpen && <SurveyCoverMenu open={open} />}
        </div>
      </div>
    </div>
  );
}

export default SurveyCover;
