import createMultiple from '@/assets/createMultiple.svg';
import createCheck from '@/assets/createCheck.svg';
import createDrop from '@/assets/createDrop.svg';
import createSubjective from '@/assets/createSubjective.svg';

interface CreateQuestionMenuProps {
  onSelect: (type: 'MULTIPLE_CHOICE' | 'SUBJECTIVE_QUESTION' | 'CHECKBOX' | 'DROPDOWN') => void;
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

function CreateQuestionMenu({ onSelect }: CreateQuestionMenuProps) {
  return (
    <div className="absolute left-[20%] top-[8%] flex flex-col w-[11.25rem] h-[12.5rem] bg-white shadow-md rounded-[1.25rem] py-[0.625rem] z-20">
      {QUESTION_MENU_ITEMS.map((item, index) => (
        <div
          key={index}
          className="w-full hover:bg-lightGray py-[0.625rem] trasiton duration-300 ease-in-out"
          onClick={() => onSelect(item.type)}
        >
          <div className="flex items-center h-6 gap-2 pl-4 cursor-pointer">
            <img src={item.icon} alt={item.icon} className="min-w-[0.875rem] h-[0.875rem]" />
            <p className="text-base leading-4 text-black">{item.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CreateQuestionMenu;
