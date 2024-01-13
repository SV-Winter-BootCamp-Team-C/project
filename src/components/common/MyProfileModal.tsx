import profile from '@/assets/profile.svg';
import close from '@/assets/closebtn.svg';
import pencil from '@/assets/pencil.svg';

interface MyProfileModalProps {
  isVisible: boolean;
  onClose: () => void;
}

function MyProfileModal({ isVisible, onClose }: MyProfileModalProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-20">
      <div className="relative w-[25rem] h-80  flex flex-col items-center justify-center bg-white shadow-md rounded-[1.25rem]">
        <div className="absolute right-2 top-2">
          <div className="flex items-center justify-center w-6 h-6 cursor-pointer" onClick={onClose}>
            <img src={close} alt="close" className="w-2 h-2" />
          </div>
        </div>
        <div className="flex items-center pb-4 pt-9">
          <img src={profile} alt="profile" className="w-10 h-10 " />
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col pb-4">
            <span className="h-4 text-[1rem]">이름</span>
            <span className="text-[0.75rem] mt-1">김성욱</span>
          </div>
          <div className="flex flex-col pb-4">
            <span className="h-4 text-[1rem]">이메일</span>
            <span className="text-[0.75rem] mt-1">test@gmail.com</span>
          </div>
          <div className="flex flex-row items-center pb-9">
            <span className="h-4 text-[1rem] pr-3">비밀번호</span>
            <img src={pencil} alt="pencil" className=" w-4 h-[0.875rem]" />
          </div>

          <div className="flex items-center justify-center pb-9">
            <button
              type="button"
              onClick={onClose}
              className="w-[6.25rem] h-9 rounded-[0.625rem] bg-purple text-base text-white hover:bg-darkPurple transition duration-300 ease-in-out"
            >
              <span className=" w-[3.75rem] h-5 text-[1rem] text-white font-medium">확인</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfileModal;
