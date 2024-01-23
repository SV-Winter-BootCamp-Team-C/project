import { useNavigate } from 'react-router-dom';
import SurveyForm from '../components/survey/SurveyForm';
import usePaginationSurveyList from '../hooks/usePaginationSurveyList';

function AllForm() {
  const navigate = useNavigate();

  const { data, currentPage, handlePageChange, searchTerm, setSearchTerm, sort, handleSortChange } =
    usePaginationSurveyList('allForm');

  return (
    <SurveyForm
      surveyData={data || { surveys: [], totalPages: 0 }}
      currentPage={currentPage}
      onClickAddButton={() => navigate('/create')}
      onPageChange={handlePageChange}
      searchTerm={searchTerm} // 검색어 상태 전달
      setSearchTerm={setSearchTerm} // 검색 핸들러 전달
      sort={sort}
      onSortChange={handleSortChange}
    />
  );
}

export default AllForm;
