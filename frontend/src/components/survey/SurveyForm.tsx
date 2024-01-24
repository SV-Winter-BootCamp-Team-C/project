import { Pagination } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { FiChevronDown } from 'react-icons/fi';
import { BiTime, BiHappyAlt, BiStopwatch } from 'react-icons/bi';
import { motion } from 'framer-motion';
import { Dispatch, SetStateAction, useState } from 'react';
import { IconType } from 'react-icons';
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
  onSortChange: (sort: string) => void;
}

const wrapperVariants = {
  open: {
    scaleY: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.1,
    },
  },
  closed: {
    scaleY: 0,
    transition: {
      when: 'afterChildren',
      staggerChildren: 0.1,
    },
  },
};

const iconVariants = {
  open: { rotate: 180 },
  closed: { rotate: 0 },
};

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      when: 'beforeChildren',
    },
  },
  closed: {
    opacity: 0,
    y: -15,
    transition: {
      when: 'afterChildren',
    },
  },
};

const actionIconVariants = {
  open: { scale: 1, y: 0 },
  closed: { scale: 0, y: -7 },
};

interface OptionProps {
  text: string;
  Icon: IconType;
  setOpen: Dispatch<SetStateAction<boolean>>;
  sortValue?: string; // 추가된 prop
  onSortChange?: (sort: string) => void; // 추가된 prop
}

function Option({ text, Icon, setOpen, sortValue, onSortChange }: OptionProps) {
  const handleOptionClick = () => {
    setOpen(false);
    if (sortValue && onSortChange) {
      onSortChange(sortValue);
    }
  };

  return (
    <motion.li
      variants={itemVariants}
      onClick={handleOptionClick}
      className="flex items-center gap-2 w-full p-2 text-xs font-medium whitespace-nowrap rounded-md hover:bg-indigo-100 text-slate-700 hover:text-[#918DCA] transition-colors cursor-pointer"
    >
      <motion.span variants={actionIconVariants}>
        <Icon />
      </motion.span>
      <span>{text}</span>
    </motion.li>
  );
}

function SurveyForm({
  surveyData,
  currentPage,
  onClickAddButton,
  onPageChange,
  searchTerm,
  setSearchTerm,
  onSortChange,
}: SurvayFormProps) {
  const location = useLocation();
  const [open, setOpen] = useState(false);

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
        {/* (최신순, 인기순, 마감일순) 드롭다운  */}
        <motion.div animate={open ? 'open' : 'closed'} className="relative z-10 ">
          <button
            type="button"
            name="sort"
            value={sort}
            onClick={() => setOpen((pv) => !pv)}
            className="flex justify-center items-center w-24 h-9 gap-2 rounded-md text-indigo-50 bg-[#918DCA] hover:bg-[#918DCA ] transition-colors"
          >
            <span className="text-base leading-4">정렬</span>
            <motion.span variants={iconVariants}>
              <FiChevronDown />
            </motion.span>
          </button>

          <motion.ul
            initial={wrapperVariants.closed}
            variants={wrapperVariants}
            style={{ originY: 'top', translateX: '-50%' }}
            className="flex flex-col rounded-lg bg-white shadow-xl absolute top-[100%] left-[50%]  w-24 h-30 overflow-hidden"
          >
            <Option setOpen={setOpen} Icon={BiTime} sortValue="latest" onSortChange={onSortChange} text="최신 순" />
            <Option
              setOpen={setOpen}
              Icon={BiHappyAlt}
              sortValue="attendCount"
              onSortChange={onSortChange}
              text="참여자 순"
            />
            <Option
              setOpen={setOpen}
              Icon={BiStopwatch}
              sortValue="deadline"
              onSortChange={onSortChange}
              text="마감일 순"
            />
          </motion.ul>
        </motion.div>
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
