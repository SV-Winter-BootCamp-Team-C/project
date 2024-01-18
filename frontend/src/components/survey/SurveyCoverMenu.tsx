import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import menuSee from '@/assets/menuSee.svg';
import menuLink from '@/assets/menuLink.svg';
import menuAnalysis from '@/assets/menuAnalysis.svg';
import menuEdit from '@/assets/menuEdit.svg';
import menuDel from '@/assets/menuDel.svg';
import { useAuthStore } from '@/store/AuthStore';
import ShareMailModal from '../common/ShareMailModal';
import DeleteSurvey from './DeleteSurvey';

interface SurveyCoverMenuProps {
  surveyId: number;
  open?: boolean;
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

function SurveyCoverMenu({ surveyId, open }: SurveyCoverMenuProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const currentMenuItems = MENU_ITEMS.find((menu) => menu.path === location.pathname);
  const [isShareModalVisible, setIsShareModalVisible] = useState(false);
  const [deleteSurvey, setDeleteSurvey] = useState<(() => void) | null>(null);
  const myId = useAuthStore((state) => state.userId) ?? 0;

  const items = currentMenuItems ? [...currentMenuItems.item] : [];

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
    if (deleteSurvey) {
      deleteSurvey();
    }
  };

  const handleItemClick = (itemName: string, sId: number) => {
    if (itemName === '보기') {
      navigate(`/responseform?id=${sId}`);
    } else if (itemName === '분석') {
      navigate(`/result?id=${sId}`);
    } else if (itemName === '공유') {
      handleShareClick(); // '공유'를 클릭했을 때 ShareMailModal을 표시
    } else if (itemName === '삭제') {
      handleDeleteSurvey();
    }
  };

  return (
    <>
      <div className="absolute top-full left-3/4 transform -translate-x-1/2 flex flex-col w-40 min-h-[6.25rem] bg-white shadow-md rounded-[1.25rem] py-[0.625rem] z-10">
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
      <DeleteSurvey
        surveyId={surveyId}
        userId={myId}
        onMutation={(mutateFunction) => setDeleteSurvey(() => mutateFunction)}
      />
    </>
  );
}

export default SurveyCoverMenu;
