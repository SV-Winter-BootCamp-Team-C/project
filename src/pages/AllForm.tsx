import SurveyForm from '@/components/survey/SurveyForm';
import { useNavigate } from 'react-router-dom';
import { getAllSurveyAPI } from '@/api/getForm';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/store/AuthStore';
import { SurveyCoverType } from '@/types/survey';
import { AxiosError } from 'axios';
import { useState } from 'react';

function AllForm() {
  const { userId } = useAuthStore();
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const { data } = useQuery<SurveyCoverType, AxiosError>({
    queryKey: ['allForm', currentPage, userId],
    queryFn: () => getAllSurveyAPI({ userId, currentPage }),
    placeholderData: keepPreviousData,
  });

  const navigate = useNavigate();
  return (
    <SurveyForm
      surveyData={data}
      currentPage={currentPage}
      onClickAddButton={() => navigate('/create')}
      onPageChange={handlePageChange}
    />
  );
}

export default AllForm;
