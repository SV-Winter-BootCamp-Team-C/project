import { getMySurveyAPI } from '@/api/getForm';
import SurveyForm from '@/components/survey/SurveyForm';
import { useAuthStore } from '@/store/AuthStore';
import { SurveyCoverType } from '@/types/survey';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function MyForm() {
  const { userId } = useAuthStore();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const { data } = useQuery<SurveyCoverType, AxiosError>({
    queryKey: ['myForm', currentPage, userId],
    queryFn: () => getMySurveyAPI({ userId, currentPage }),
    placeholderData: keepPreviousData,
  });

  return (
    <SurveyForm
      surveyData={data || { surveys: [], totalPages: 0 }}
      currentPage={currentPage}
      onClickAddButton={() => navigate('/create')}
      onPageChange={handlePageChange}
    />
  );
}

export default MyForm;
