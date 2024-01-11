import SurveyCover from '@/components/survey/SurveyCover';
import { Survey } from '@/types/survey';
import search from '@/assets/search.svg';
import { AddButton } from '@/components/common/Button';
import { Pagination } from '@mui/material';
import { useLocation } from 'react-router-dom';

interface SurvayFormProps {
  totalPages: number; // 페이지 개수
  onClickAddButton?: () => void;
}

interface SurveyData {
  surveys: Survey[];
}

// 테스트용 데이터
const surveyData: SurveyData = {
  surveys: [
    {
      survey_id: 1,
      title: '나를 맞춰봐나를 맞춰봐나를 맞춰봐나를 맞춰봐나를 맞춰봐',
      main_image_url: '',
      created_at: '2022.02.22',
      updated_at: '2022.02.22',
      deadline: '2024.01.11',
      atted_count: 10,
      open: false,
    },
    {
      survey_id: 2,
      title: '논문폼',
      main_image_url: '', // 이미지 없을 경우
      created_at: '2022.02.22',
      updated_at: '2022.02.22',
      deadline: '2024.02.23',
      atted_count: 10,
      open: true,
    },
  ],
};

function SurvdForm({ totalPages, onClickAddButton }: SurvayFormProps) {
  const location = useLocation();
  return (
    <div className="flex flex-col items-center pt-6">
      <div className="flex justify-between w-[25rem] h-12 px-7 py-3 rounded-[1.875rem] border-2 border-darkGray border-solid gap-7">
        <input
          name="search"
          type="text"
          placeholder="설문 제목을 입력하세요."
          className="w-[18.75rem] text-base focus:outline-none"
        />
        <div className="flex items-center justify-center w-6 h-6">
          <img src={search} alt="search" />
        </div>
      </div>
      <div className="flex items-center justify-between w-full items-centers px-[3.75rem]">
        <div className="flex gap-6">
          <div>
            <select name="filter" className="focus:outline-none">
              <option value="all">모든 설문</option>
              <option value="view">조회한 설문</option>
              <option value="like">좋아요한 설문</option>
            </select>
          </div>
          <div>
            <select name="sort" className="focus:outline-none">
              <option value="latest">최신 순</option>
              <option value="views">조회수 순</option>
              <option value="likes">좋아요 순</option>
            </select>
          </div>
        </div>
        <div>
          {location.pathname !== '/myresponses' && <AddButton text="추가" onClick={onClickAddButton as () => void} />}
        </div>
      </div>
      {/* 구분선 */}
      <div className="w-[63.5rem] mt-3 mx-8 h-[1px] bg-darkGray" />

      <div className="grid grid-cols-3 py-8 lg:grid-cols-3 px-9 gap-y-4 gap-x-6">
        {surveyData.surveys.map((item) => (
          <SurveyCover
            key={item.survey_id}
            id={item.survey_id}
            title={item.title}
            mainImageUrl={item.main_image_url}
            deadline={item.deadline}
            attedCount={item.atted_count}
            open={item.open}
          />
        ))}
      </div>
      <Pagination count={totalPages} className="absolute bottom-4" />
    </div>
  );
}

export default SurvdForm;
