import { useState } from 'react';
import typeIcon from '../../assets/type.svg';
import addIcon from '../../assets/add.svg';
import copyIcon from '../../assets/copy.svg';
import deleteIcon from '../../assets/delete.svg';
import imageaddIcon from '../../assets/imageadd.svg';
import trashcanIcon from '../../assets/trashcan.svg';
import checkIcon from '../../assets/check.svg';

interface Choice {
  id: number;
  value: string;
  isChecked: boolean;
}

function CheckBox() {
  const [choices, setChoices] = useState<Choice[]>([{ id: 1, value: '', isChecked: false }]); // 초기 상태에 1개의 빈 선택지를 설정
  const [image, setImage] = useState<string | null>(null); // 이미지 상태 초기화

  // 새 선택지를 추가하는 함수
  const addChoice = () => {
    const newId = choices.length + 1;
    setChoices([...choices, { id: newId, value: '', isChecked: false }]);
  };

  // 선택지 삭제 함수
  const deleteChoice = (id: number) => {
    setChoices(choices.filter((choice) => choice.id !== id)); // 삭제할 id를 제외한 선택지만 필터링
  };

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

  // 체크박스 상태 변경 함수
  const toggleCheckbox = (id: number) => {
    setChoices(choices.map((choice) => (choice.id === id ? { ...choice, isChecked: !choice.isChecked } : choice)));
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
          <span className="ml-2 font-medium text-left text-darkGray">체크박스</span>
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
            id="checkbox-image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
          />
          <label htmlFor="checkbox-image-upload" className="image-upload-label">
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

      <div className="flex flex-col items-center justify-center w-[50rem]">
        {choices.map((choice) => (
          <div key={choice.id} className="flex justify-center items-center w-full mb-2">
            <div className="relative flex w-[25rem] h-10 bg-lightGray rounded-[1.25rem]">
              <label
                htmlFor={`checkbox-${choice.id}`}
                className={`absolute top-[0.625rem] left-[0.625rem] w-5 h-5 flex justify-center items-center rounded-md ${
                  choice.isChecked ? 'bg-blue-500' : 'bg-white'
                } border border-gray-300`}
              >
                <input
                  type="checkbox"
                  id={`checkbox-${choice.id}`}
                  className="opacity-0 absolute"
                  checked={choice.isChecked}
                  onChange={() => toggleCheckbox(choice.id)}
                  disabled // 체크박스 비활성화
                />
                {choice.isChecked && <img src={checkIcon} alt="Checked" className="w-4 h-4" />}
              </label>

              <button
                type="button"
                className="absolute top-[0.625rem] right-[0.625rem] focus:outline-none"
                onClick={() => deleteChoice(choice.id)} // 삭제 버튼 클릭 시 deleteChoice 함수 호출
              >
                <img src={deleteIcon} alt="Delete" className="w-full h-full" />
              </button>

              <div className="flex justify-center items-center w-full">
                <input
                  type="text"
                  required
                  placeholder="텍스트를 입력해주세요."
                  className="w-60 h-8 text-base text-center text-black rounded-md border border-dashed border-gray focus:outline-none focus:border-2 focus:border-black"
                  value={choice.value}
                  onChange={(e) => {
                    const newChoices = choices.map((item) =>
                      item.id === choice.id ? { ...item, value: e.target.value } : item,
                    );
                    setChoices(newChoices);
                  }}
                />
              </div>
            </div>
          </div>
        ))}
        <button type="button" onClick={addChoice} className="focus:outline-none">
          <img src={addIcon} alt="Add" className="w-5 h-5 mb-2" />
        </button>
      </div>
    </div>
  );
}

export default CheckBox;
