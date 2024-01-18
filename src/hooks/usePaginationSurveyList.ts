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
  const { userId } = useAuthStore();
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const queryFn = QUERY_FN_MAP[path];

  const { data, isError, isPending } = useQuery<SurveyCoverType, AxiosError>({
    queryKey: [path, currentPage, userId as number],
    queryFn: () => queryFn({ userId: userId as number, currentPage }),
    placeholderData: keepPreviousData,
    meta: { errorMessage: '설문지 목록을 불러오는 중 오류가 발생했습니다.' },
  });

  return { data, currentPage, handlePageChange, isError, isPending };
};

export default usePaginationSurveyList;
