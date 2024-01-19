import { Pagination } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { SurveyCoverType } from '../../types/survey';
import search from '../../assets/search.svg';
import { AddButton } from '../common/Button';
import SurveyCover from './SurveyCover';

interface SurvayFormProps {
  surveyData: SurveyCoverType;
  currentPage: number;
  onClickAddButton?: () => void;
  onPageChange: (page: number) => void;
  searchTerm: string; // 현재 검색어 상태
  setSearchTerm: (searchTerm: string) => void; // 검색어 상태를 업데이트하는 함수
}

function SurveyForm({
  surveyData,
  currentPage,
  onClickAddButton,
  onPageChange,
  searchTerm,
  setSearchTerm,
}: SurvayFormProps) {
  const location = useLocation();

  console.log('전달된 surveyData:', surveyData);
  console.log('검색:', surveyData.surveys);

  return (
    <div className="flex flex-col items-center pt-6">
      <div className="flex justify-between w-[25rem] h-12 px-7 py-3 rounded-[1.875rem] border-2 border-gray border-solid gap-7 hover:border-darkGray transition duration-300 ease-in-out">
        <input
          name="search"
          type="text"
          placeholder="설문 제목을 입력하세요."
          className="w-[18.75rem] text-base focus:outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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

      {surveyData.surveys && surveyData?.surveys.length > 0 ? (
        <div className="grid grid-cols-3 pt-6 lg:grid-cols-3 px-9 gap-y-4 gap-x-6">
          {surveyData.surveys.map((item) => (
            <SurveyCover
              key={item.surveyId}
              surveyId={item.surveyId}
              title={item.title}
              open={item.open}
              mainImageUrl={item.mainImageUrl}
              createdAt={item.createdAt}
              updatedAt={item.updatedAt}
              deadline={item.deadline}
              isAttended={item.isAttended}
              attendCount={item.attendCount}
            />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center py-8 ">
          <p className="text-base text-gray">설문이 없습니다.</p>
        </div>
      )}

      {surveyData.totalPages !== 0 && (
        <Pagination
          count={surveyData?.totalPages}
          page={currentPage}
          onChange={(_, page) => onPageChange(page)}
          className="absolute bottom-4"
        />
      )}
    </div>
  );
}

export default SurveyForm;
