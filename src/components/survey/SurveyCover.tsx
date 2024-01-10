import survey from '@/assets/surveyDefault.png';
import participants from '@/assets/participants.svg';
import { calculateRemainingDays } from '@/utils/calculateRemainingDays';

interface SurveyCoverProps {
  title: string;
  mainImageUrl: string;
  deadline: string;
  attedCount: number;
}

function SurveyCover({ title, mainImageUrl, deadline, attedCount }: SurveyCoverProps) {
  const imageUrl = mainImageUrl || survey;
  const { textLabel, textColor } = calculateRemainingDays(deadline);

  return (
    <div>
      <div className="inline-block w-80 h-[11.25rem] rounded-[0.625rem] border-2 border-solid border-darkGary">
        <img src={imageUrl} alt="survey" className="object-cover w-full h-full" />
      </div>

      <div className="flex items-center justify-between px-3 pt-[0.625rem]">
        <div className="w-40 text-base font-medium text-left text-black truncate">{title}</div>
        <div className="flex items-center gap-3">
          <span className={`${textColor} text-xs`}>{textLabel}</span>
          <div className="flex items-center gap-1">
            <img src={participants} alt="participants" className="w-[0.625rem] h-3 align-middle" />
            <span className="text-xs text-darkGary">{attedCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SurveyCover;
