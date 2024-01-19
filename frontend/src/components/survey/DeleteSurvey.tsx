import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useState } from 'react';
import Alert from '../common/Alert';
import { deleteSurveyAPI } from '../../api/deleteSurvey';
import { getClient } from '../../queryClient';

interface DeleteSurveyProps {
  surveyId: number;
  userId: number;
  onMutation: (mutateFunction: () => void) => void;
}
type AlertType = 'error' | 'success';

interface AlertState {
  type: AlertType;
  message: string;
}

function DeleteSurvey({ surveyId, userId, onMutation }: DeleteSurveyProps) {
  const [alert, setAlert] = useState<AlertState | null>(null);

  const mutation = useMutation({
    mutationFn: () => deleteSurveyAPI(surveyId, userId),
    onSuccess: () => {
      setAlert({ type: 'success', message: '삭제되었습니다.' });
      getClient.invalidateQueries({ queryKey: ['allSurveys'] });
      getClient.refetchQueries({ queryKey: ['allSurveys'] });
      getClient.invalidateQueries({ queryKey: ['myForm', userId] });
      getClient.refetchQueries({ queryKey: ['myForm', userId] });
      getClient.invalidateQueries({ queryKey: ['myResponse', userId] });
      getClient.refetchQueries({ queryKey: ['myResponse', userId] });
    },
    onError: (error: AxiosError) => {
      let message = '오류가 발생했습니다.';
      const type: AlertType = 'error'; // 타입을 명시적으로 지정
      if (error.response?.status === 404) {
        message = '삭제할 설문이 없습니다.';
      } else if (error.response?.status === 403) {
        message = '설문 삭제 권한이 없습니다.';
      }
      setAlert({ type, message });
    },
  });

  onMutation(mutation.mutate);

  return (
    <div>
      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          buttonText="확인"
          buttonClick={() => window.location.reload()}
        />
      )}
    </div>
  );
}

export default DeleteSurvey;
