import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import menuSee from '../../assets/menuSee.svg';
import menuLink from '../../assets/menuLink.svg';
import menuAnalysis from '../../assets/menuAnalysis.svg';
import menuEdit from '../../assets/menuEdit.svg';
import menuDel from '../../assets/menuDel.svg';
import { useAuthStore } from '../../store/AuthStore';
import ShareMailModal from '../common/ShareMailModal';
import { deleteSurveyAPI } from '../../api/deleteSurvey';
import { getClient } from '../../queryClient';
import Alert from '../common/Alert';
import { ApiResponseError } from '../../types/apiResponseError';

interface SurveyCoverMenuProps {
  surveyId: number;
  open?: boolean;
  attendCount?: number;
}

interface MenuItem {
  id: number;
  path: string;
  item: string[];
}

interface ItemIcon {
  item: string;
  icon: string;
}

const MENU_ITEMS: MenuItem[] = [
  { id: 1, path: '/all', item: ['보기', '공유', '분석'] },
  { id: 2, path: '/myform', item: ['보기', '편집', '공유', '분석', '삭제'] },
  { id: 3, path: '/myresponses', item: ['보기', '공유'] },
];

const ITEM_ICON: ItemIcon[] = [
  { item: '보기', icon: menuSee },
  { item: '편집', icon: menuEdit },
  { item: '공유', icon: menuLink },
  { item: '분석', icon: menuAnalysis },
  { item: '삭제', icon: menuDel },
];

function SurveyCoverMenu({ surveyId, open, attendCount }: SurveyCoverMenuProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const myId = useAuthStore((state) => state.userId) ?? 0;
  const currentMenuItems = MENU_ITEMS.find((menu) => menu.path === location.pathname);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [showEditAlert, setShowEditAlert] = useState<boolean>(false);
  const [isShareModalVisible, setIsShareModalVisible] = useState(false);

  const { mutate, isError: deleteError } = useMutation({
    mutationFn: () => deleteSurveyAPI(surveyId, myId),
    onSuccess: () => {
      getClient.invalidateQueries({ queryKey: ['allSurveys'] });
      getClient.refetchQueries({ queryKey: ['allSurveys'] });
      getClient.invalidateQueries({ queryKey: ['myForm', myId] });
      getClient.refetchQueries({ queryKey: ['myForm', myId] });
      getClient.invalidateQueries({ queryKey: ['myResponse', myId] });
      getClient.refetchQueries({ queryKey: ['myResponse', myId] });
    },
    onError: (error: AxiosError) => {
      const err = error as AxiosError<ApiResponseError>;
      setErrorMessage(err.response?.data?.message || '설문 삭제에 실패했습니다.');
    },
  });

  const items = currentMenuItems ? [...currentMenuItems.item].filter((item) => !(open && item === '편집')) : [];

  if (location.pathname === '/myresponses' && open) {
    items.push('분석');
  }

  const getIcon = (itemName: string) => {
    const icon = ITEM_ICON.find((iconItem) => iconItem.item === itemName)?.icon;
    return icon || '';
  };

  const handleShareClick = () => {
    setIsShareModalVisible(true);
  };

  const handleDeleteSurvey = () => {
    mutate();
  };

  const isEditable = () => {
    return open === false && attendCount === 0;
  };

  const handleItemClick = (itemName: string, sId: number) => {
    if (itemName === '보기') {
      navigate(`/view?id=${sId}`);
    } else if (itemName === '편집') {
      if (isEditable()) {
        navigate(`/edit?id=${sId}`);
      } else {
        setShowEditAlert(true);
      }
    } else if (itemName === '공유') {
      handleShareClick();
    } else if (itemName === '분석') {
      navigate(`/result?id=${sId}`);
    } else if (itemName === '삭제') {
      handleDeleteSurvey();
    }
  };

  return (
    <>
      <div className="absolute top-full left-3/4 transform -translate-x-1/2 flex flex-col w-40 min-h-[6.25rem] bg-white shadow-md rounded-[1.25rem] py-[0.625rem] z-[5]">
        {items.map((itemName, index) => (
          <div
            key={index}
            className="w-full hover:bg-lightGray py-[0.625rem] trasiton duration-300 ease-in-out"
            onClick={() => handleItemClick(itemName, surveyId)}
          >
            <div className="flex items-center h-6 gap-2 pl-4 cursor-pointer">
              <img src={getIcon(itemName)} alt={itemName} className="w-4 h-4" />
              <p className={`text-base leading-4 ${itemName === '삭제' ? 'text-[#D0021B]' : 'text-black'}`}>
                {itemName}
              </p>
            </div>
          </div>
        ))}
      </div>
      {isShareModalVisible && (
        <ShareMailModal
          surveyId={surveyId}
          isVisible={isShareModalVisible}
          onClose={() => setIsShareModalVisible(false)}
        />
      )}
      {deleteError && <Alert type="error" message={errorMessage} buttonText="확인" />}
      {showEditAlert && (
        <Alert
          type="error"
          message="참여자가 있는 설문은 편집할 수 없습니다."
          buttonText="확인"
          buttonClick={() => setShowEditAlert(false)}
        />
      )}
    </>
  );
}

export default SurveyCoverMenu;
