import { motion } from 'framer-motion';
import { useRef, useEffect } from 'react';
import createMultiple from '../../assets/createMultiple.svg';
import createCheck from '../../assets/createCheck.svg';
import createDrop from '../../assets/createDrop.svg';
import createSubjective from '../../assets/createSubjective.svg';

interface CreateQuestionMenuProps {
  onSelect: (type: 'MULTIPLE_CHOICE' | 'SUBJECTIVE_QUESTION' | 'CHECKBOX' | 'DROPDOWN') => void;
  isOpen: boolean; // 여기를 boolean으로 변경합니다.
  onClose: () => void; // 드롭다운을 닫는 함수를 추가합니다.
}

interface QuestionMenuItem {
  icon: string;
  type: 'MULTIPLE_CHOICE' | 'SUBJECTIVE_QUESTION' | 'CHECKBOX' | 'DROPDOWN';
  name: string;
}

const QUESTION_MENU_ITEMS: QuestionMenuItem[] = [
  { icon: createMultiple, type: 'MULTIPLE_CHOICE', name: '객관식 문항' },
  { icon: createCheck, type: 'CHECKBOX', name: '체크박스 문항' },
  { icon: createDrop, type: 'DROPDOWN', name: '드롭다운 문항' },
  { icon: createSubjective, type: 'SUBJECTIVE_QUESTION', name: '주관식 문항' },
];
const dropdownVariants = {
  open: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 20,
    },
  },
  closed: {
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.2,
    },
  },
};

function CreateQuestionMenu({ onSelect, isOpen, onClose }: CreateQuestionMenuProps) {
  const dropdownRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="relative">
      <motion.ul
        ref={dropdownRef}
        initial="closed"
        animate={isOpen ? 'open' : 'closed'}
        variants={dropdownVariants}
        className="absolute left-[20%] top-[8%] flex flex-col w-[10rem] h-[12.5rem] bg-white shadow-md rounded-[1.25rem] py-[0.625rem] z-20"
      >
        {QUESTION_MENU_ITEMS.map((item, index) => (
          <motion.li
            key={index}
            className="flex items-center justify-start gap-2 w-full p-3 whitespace-nowrap rounded-md hover:bg-indigo-100 text-slate-700 hover:text-[#918DCA] transition-colors cursor-pointer"
            onClick={() => onSelect(item.type)}
          >
            <motion.div className="flex items-center h-6 gap-2 px-2 cursor-pointer">
              <img src={item.icon} alt={item.icon} className="min-w-[0.875rem] h-[0.875rem]" />
              <span className="text-base leading-4 text-black">{item.name}</span>
            </motion.div>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}
export default CreateQuestionMenu;
