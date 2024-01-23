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
  sort: string;
  onSortChange: (sort: string) => void;
}

function SurveyForm({
  surveyData,
  currentPage,
  onClickAddButton,
  onPageChange,
  searchTerm,
  setSearchTerm,
  sort,
  onSortChange,
}: SurvayFormProps) {
  const location = useLocation();

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
        <div>
          <select
            name="sort"
            className="focus:outline-none"
            value={sort}
            onChange={(e) => onSortChange(e.target.value)}
          >
            <option value="latest">최신 순</option>
            <option value="attendCount">참여자 순</option>
            <option value="deadline">마감일 순</option>
          </select>
        </div>

        <div>
          {location.pathname !== '/myresponses' && <AddButton text="추가" onClick={onClickAddButton as () => void} />}
        </div>
      </div>
      {/* 구분선 */}
      <div className="w-[67.5rem] mt-3 mx-8 h-[1px] bg-darkGray" />

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

      {surveyData.surveys && surveyData?.surveys.length > 0 && (
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
