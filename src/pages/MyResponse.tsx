import { getMyResponseAPI } from '@/api/getForm';
import Alert from '@/components/common/Alert';
import SurveyForm from '@/components/survey/SurveyForm';
import { useAuthStore } from '@/store/AuthStore';
import { SurveyCoverType } from '@/types/survey';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useState } from 'react';

function MyResponse() {
  const { userId } = useAuthStore();
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const { data, isError } = useQuery<SurveyCoverType, AxiosError>({
    queryKey: ['myResponse', currentPage, userId],
    queryFn: () => getMyResponseAPI({ userId, currentPage }),
    placeholderData: keepPreviousData,
  });

  return (
    <>
      {isError && <Alert type="error" message="설문을 불러오는데 실패했습니다." buttonText="확인" />}
      <SurveyForm
        surveyData={data || { surveys: [], totalPages: 0 }}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
}

export default MyResponse;
