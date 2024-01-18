import { useAuthStore } from '@/store/AuthStore';
import { SurveyCoverType } from '@/types/survey';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { getAllSurveyAPI, getMySurveyAPI, getMyResponseAPI } from '@/api/getForm';

type PathType = 'allForm' | 'myForm' | 'myResponse';

const QUERY_FN_MAP = {
  allForm: getAllSurveyAPI,
  myForm: getMySurveyAPI,
  myResponse: getMyResponseAPI,
};

const usePaginationSurveyList = (path: PathType) => {
  const userId = useAuthStore((state) => state.userId ?? undefined);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>(''); // 검색어 상태 추가

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (term: string) => {
    setSearchTerm(term); // 검색어 변경 핸들러
    setCurrentPage(1); // 검색 시 첫 페이지로 리셋
  };

  const queryFn = QUERY_FN_MAP[path];

  const { data, isError, isPending } = useQuery<SurveyCoverType, AxiosError>({
    queryKey: [path, currentPage, userId, searchTerm], // 검색어를 쿼리 키에 추가
    queryFn: () => queryFn({ userId, currentPage, title: searchTerm }), // API 호출 시 검색어 전달
    select: (responseData) => {
      // API 응답에서 sortedList가 있는지 확인하고,
      // 있다면 그것을 surveys로 매핑하거나,
      // 없다면 기존 surveys를 그대로 사용합니다.
      return {
        surveys: responseData.sortedList ?? responseData.surveys,
        totalPages: responseData.totalPages,
      };
    },
    placeholderData: keepPreviousData,
    meta: { errorMessage: '설문지 목록을 불러오는 중 오류가 발생했습니다.' },
  });

  return { data, currentPage, handlePageChange, handleSearchChange, isError, isPending, searchTerm, setSearchTerm };
};

export default usePaginationSurveyList;
