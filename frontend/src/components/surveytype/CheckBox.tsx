import { useState } from 'react';
import typeIcon from '../../assets/type.svg';
import addIcon from '../../assets/add.svg';
import copyIcon from '../../assets/copy.svg';
import deleteIcon from '../../assets/delete.svg';
import imageaddIcon from '../../assets/imageadd.svg';
import trashcanIcon from '../../assets/trashcan.svg';
import checkIcon from '../../assets/check.svg';
import { EditableObjectiveQuestion } from '../../types/editableSurvey';
import { uploadS3 } from '../../utils/s3ImgUpload';

interface CheckBoxProps {
  index: number;
  data: EditableObjectiveQuestion;
  updateQuestion: (index: number, data: EditableObjectiveQuestion) => void;
  copyQuestion: (index: number) => void;
  deleteQuestion: (index: number) => void;
}

function CheckBox({ index, data, updateQuestion, copyQuestion, deleteQuestion }: CheckBoxProps) {
  const [image, setImage] = useState<string | null>(null);

  // 새 선택지를 추가하는 함수
  const addChoice = () => {
    const newChoices = [...data.choices, { option: '' }];
    updateQuestion(index, { ...data, choices: newChoices });
  };

  // 선택지 삭제 함수
  const deleteChoice = (choiceIndex: number) => {
    const newChoices = data.choices.filter((_, i) => i !== choiceIndex);
    updateQuestion(index, { ...data, choices: newChoices });
  };

  // 이미지 업로드 핸들러
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      // S3에 이미지 업로드
      try {
        const uploadedUrl = await uploadS3(file);
        updateQuestion(index, { ...data, imageUrl: uploadedUrl });
      } catch (error) {
        console.error('이미지 업로드 실패:', error);
      }
    }
  };

  const handleDeleteImage = () => {
    setImage(null);
    updateQuestion(index, { ...data, imageUrl: '' });
  };
  // 선택지 변경 핸들러
  const handleOptionChange = (choiceIndex: number, newValue: string) => {
    const updatedChoices = data.choices.map((choice, i) =>
      i === choiceIndex ? { ...choice, option: newValue } : choice,
    );

    updateQuestion(index, { ...data, choices: updatedChoices });
  };

  // 체크박스 상태 변경 함수
  // const toggleCheckbox = (id: number) => {
  //   setChoices(choices.map((choice) => (choice.id === id ? { ...choice, isChecked: !choice.isChecked } : choice)));
  // };

  return (
    <div
      className="flex flex-col items-center justify-center rounded-[1.25rem] bg-white border border-purple"
      style={{ boxShadow: '0 0 0.25rem 0.25rem rgba(145,141,202,0.25)' }}
    >
      <div className="flex justify-between w-full mt-4">
        <div className="flex items-center ml-4">
          <button type="button" className="items-center focus:outline-none">
            <img src={typeIcon} alt="Type" className="w-5 h-5" />
          </button>
          <span className="ml-2 font-medium text-left text-darkGray">체크박스</span>
        </div>
        <div className="flex mr-4">
          <button
            type="button"
            className="items-center w-5 h-5 mr-2 focus:outline-none"
            onClick={() => copyQuestion(index)}
          >
            <img src={copyIcon} alt="Copy" className="w-full h-full" />
          </button>

          <button
            type="button"
            className="items-center w-5 h-5 mr-2 focus:outline-none"
            onClick={() => deleteQuestion(index)}
          >
            <img src={trashcanIcon} alt="Trashcan" className="w-full h-full" />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-center w-full">
        <span className="text-[2rem] font-semibold text-center text-black -translate-y-4">Q{index + 1}.</span>
      </div>

      <div className="relative flex items-center justify-center w-full mb-4">
        <div className="flex justify-center items-center w-[14.375rem] max-w-[50rem] h-8 ">
          <input
            type="text"
            required
            value={data.content}
            onChange={(e) => updateQuestion(index, { ...data, content: e.target.value })}
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
            <img src={imageaddIcon} alt="Upload" className="w-5 h-5 cursor-pointer" />
          </label>
        </div>
      </div>

      {image && (
        <div className="mb-4">
          <button
            type="button"
            className="flex items-start justify-start w-5 h-5 focus:outline-none"
            onClick={handleDeleteImage} // 이미지 삭제
          >
            <img src={deleteIcon} alt="Delete" className="w-full h-full rounded-[0.625rem]" />
          </button>
          <img
            src={data.imageUrl}
            alt="Preview"
            className="rounded-[0.625rem] border-2 border-solid border-gray max-w-[45rem] max-h-[45rem]"
          />
          <div className="flex items-center justify-center w-full" />
        </div>
      )}

      <div className="flex flex-col items-center justify-center w-[50rem]">
        {data.choices.map((choice, choiceIndex) => (
          <div key={choiceIndex} className="flex items-center justify-center w-full mb-2">
            <div className="relative flex w-[25rem] h-10 bg-lightGray rounded-[1.25rem]">
              <label
                htmlFor={`checkbox-${choiceIndex}`}
                className="absolute top-[0.625rem] left-[0.625rem] w-5 h-5 flex justify-center items-center rounded-md  bg-white border border-gray-300"
              >
                <input
                  type="checkbox"
                  // id={`checkbox-${choice.id}`}
                  // checked={choice.isChecked}
                  value={choice.option}
                  className="absolute opacity-0"
                  disabled // 체크박스 비활성화
                />
                {/* {choice.isChecked && <img src={checkIcon} alt="Checked" className="w-4 h-4" />} */}
              </label>

              <button
                type="button"
                className="absolute top-[0.625rem] right-[0.625rem] focus:outline-none"
                onClick={() => deleteChoice(choiceIndex)} // 삭제 버튼 클릭 시 deleteChoice 함수 호출
              >
                <img src={deleteIcon} alt="Delete" className="w-full h-full" />
              </button>

              <div className="flex items-center justify-center w-full">
                <input
                  type="text"
                  required
                  placeholder="텍스트를 입력해주세요."
                  className="h-8 text-base text-center text-black border border-dashed rounded-md w-60 border-gray focus:outline-none focus:border-2 focus:border-black"
                  value={choice.option}
                  onChange={(e) => handleOptionChange(choiceIndex, e.target.value)}
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
