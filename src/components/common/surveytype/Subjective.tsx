import { useState } from 'react';
import typeIcon from '@/assets/type.svg';
import copyIcon from '@/assets/copy.svg';
import deleteIcon from '@/assets/delete.svg';
import imageaddIcon from '@/assets/imageadd.svg';
import trashcanIcon from '@/assets/trashcan.svg';

function Subjective() {
  const [image, setImage] = useState<string | null>(null); // 이미지 상태 초기화

  // 이미지 업로드 핸들러
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string); // 이미지 상태를 업데이트
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = () => {
    setImage(null); // 이미지 상태를 null로 설정하여 이미지를 삭제
  };

  return (
    <div
      className="flex flex-col items-center justify-center rounded-[1.25rem] bg-white border border-purple"
      style={{ boxShadow: '0 0 0.25rem 0.25rem rgba(145,141,202,0.25)' }}
    >
      <div className="flex justify-between w-full mt-4">
        <div className="flex items-center ml-4">
          <button type="button" className="focus:outline-none items-center">
            <img src={typeIcon} alt="Type" className="w-5 h-5" />
          </button>
          <span className="ml-2 font-medium text-left text-darkGray">주관식</span>
        </div>
        <div className="flex mr-4">
          <button type="button" className="focus:outline-none w-5 h-5 mr-2  items-center">
            <img src={copyIcon} alt="Copy" className="w-full h-full" />
          </button>

          <button type="button" className="focus:outline-none w-5 h-5 mr-2 items-center">
            <img src={trashcanIcon} alt="Trashcan" className="w-full h-full" />
          </button>
        </div>
      </div>

      <div className="flex justify-center items-center w-full">
        <span className="text-[2rem] font-semibold text-center text-black -translate-y-4">Q1.</span>
      </div>

      <div className="relative flex justify-center items-center w-full mb-4">
        <div className="flex justify-center items-center w-[14.375rem] max-w-[50rem] h-8 ">
          <input
            type="text"
            required
            placeholder="질문을 입력해주세요."
            className="w-full h-full text-[1rem] text-center text-black rounded-[0.625rem] border border-gray"
          />
        </div>
        <div className="absolute right-[15.625rem]">
          <input
            id="subjective-image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
          />
          <label htmlFor="subjective-image-upload" className="image-upload-label">
            {/* 이미지 업로드 버튼 */}
            <img src={imageaddIcon} alt="Upload" className="w-5 h-5" />
          </label>
        </div>
      </div>

      {image && (
        <div className="mb-4">
          <button
            type="button"
            className="focus:outline-none w-5 h-5 flex justify-start items-start"
            onClick={handleDeleteImage} // 이미지 삭제
          >
            <img src={deleteIcon} alt="Delete" className="w-full h-full rounded-[0.625rem]" />
          </button>
          <img
            src={image}
            alt="Preview"
            className="rounded-[0.625rem] border-2 border-solid border-gray max-w-[45rem] max-h-[45rem]"
          />
          <div className="flex justify-center items-center w-full" />
        </div>
      )}

      <div className="flex  w-[50rem] mb-[1rem]">
        <div className="flex justify-center items-center w-full">
          <span className="w-[25rem] py-2 pl-2 text-base text-start text-darkGray rounded-lg border border-solid border-darkGray">
            주관식 답변을 작성해주세요.
          </span>
        </div>
      </div>
    </div>
  );
}

export default Subjective;
