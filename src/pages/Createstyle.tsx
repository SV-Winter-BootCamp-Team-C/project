// import Alert from '@/components/common/Alert';
import { useState } from 'react';
import { SketchPicker } from 'react-color';
import { Scrollbars } from 'react-custom-scrollbars';
import Navbar from '../components/common/Navbar';
import insertImage from '../assets/insertImage.svg';
import publicIcon from '../assets/publicIcon.svg';
import privateIcon from '../assets/privateIcon.svg';
import deleteIcon from '../assets/deleteIcon.svg';
// Div
type DivItem = {
  id: string;
  label: string;
  roundedClass: string;
};

const DIV_ITEMS: DivItem[] = [
  { id: 'sharp', label: '각지게', roundedClass: 'rounded-none' },
  { id: 'smooth', label: '부드럽게', roundedClass: 'rounded-[0.625rem]' },
  { id: 'round', label: '둥글게', roundedClass: 'rounded-[1.875rem]' },
];

// Font
type FontItem = {
  id: string;
  fontClass: string;
  text: string;
};

const FONT_ITEMS: FontItem[] = [
  { id: 'pretendard', fontClass: 'font-pretendardFont', text: '프리텐다드' },
  { id: 'tmoney', fontClass: 'font-tMoney', text: '티머니 둥근바람' },
  { id: 'nps', fontClass: 'font-npsFont', text: '국민연금체' },
  { id: 'omyu', fontClass: 'font-omyuFont', text: '오뮤 다예쁨체' },
  { id: 'seolleim', fontClass: 'font-seolleimFont', text: '시원한 설레임체' },
];

// OPption
type OptionItem = {
  id: string;
  icon: string;
  text: string;
};

const OPTION_ITEMS: OptionItem[] = [
  { id: 'public', icon: 'publicIcon', text: '공개' },
  { id: 'private', icon: 'privateIcon', text: '비공개' },
];

function Createstyle() {
  const [activeDiv, setActiveDiv] = useState<string>('sharp');
  const [activeFont, setActiveFont] = useState<string>('pretendard');
  const [selectedOption, setSelectedOption] = useState<string>('public');
  const [color, setColor] = useState('#640FF2');
  const [showPicker, setShowPicker] = useState(false);

  const handleDivClick = (divId: string) => {
    setActiveDiv(divId);
  };

  const handleFontClick = (fontId: string) => {
    setActiveFont(fontId);
  };

  const handleOptionClick = (optionId: string) => {
    setSelectedOption(optionId);
  };

  const handleColorChange = (selectedColor: { hex: string }) => {
    setColor(selectedColor.hex);
  };

  const toggleColorPicker = () => {
    setShowPicker(!showPicker);
  };

  const handleButtonClick = (buttonColor: string) => {
    setColor(buttonColor);
  };

  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target?.result as string);
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const handleDeleteImage = () => {
    setImageSrc(null); // 이미지 상태를 null로 설정하여 이미지를 삭제
  };

  return (
    <div className="relative flex min-h-screen w-full bg-cover items-center justify-center p-16 bg-custom-gradient">
      <Navbar>
        {/* scroll */}
        <Scrollbars style={{ position: 'absolute', top: '2.25rem', right: '0.1rem', width: 1080, height: 830 }}>
          {/* top bar */}
          <div
            className="flex w-[18.75rem] h-[3.75rem] mx-[24.38rem] rounded-[1.25rem] bg-white"
            style={{ boxShadow: '4px 4px 4px 0 rgba(0,0,0,0.25)' }}
          >
            <div className="flex flex-row justify-center mx-6 my-4 gap-3">
              <div className="flex flex-col  items-center w-[7.5rem] h-7 ">
                <div className="flex">
                  <span className="text-[1.25rem] text-center text-black font-semibold">스타일</span>
                </div>
                <div className="w-[6.25rem] h-1 mt-[0.12rem] bg-[#918DCA]" />
              </div>
              <div className="flex flex-col  items-center w-[7.5rem] h-7 ">
                <div className="flex">
                  <span className="text-[1.25rem] text-center text-black font-semibold">문제</span>
                </div>
                <div className="w-[6.25rem] h-1 mt-[0.12rem] bg-white" />
              </div>
            </div>
          </div>
          {/* choose style */}
          {/* Write title */}
          <div className="flex flex-col mt-[2.63rem] ml-[3.12rem]">
            <div className="flex items-center">
              <div className="flex w-[5.625rem] h-[2.0315rem]">
                <span className="text-[2rem] font-semibold">제목 :</span>
              </div>
              <div className="flex items-center w-[16.25rem] h-[3.125rem] rounded-[0.625rem] ml-[0.63rem] border-solid border-[0.00625rem] border-[#B4B4B4] hover:border-[0.125rem] hover:border-darkGray">
                <input
                  type="text"
                  required
                  placeholder="제목을 입력해주세요."
                  className="w-full h-[3.75rem] text-[1.25rem] text-black pl-[0.63rem] focus:outline-none"
                />
              </div>
            </div>

            {/* Write Description */}
            <div className="flex flex-col mt-[2.63rem]">
              <div className="flex w-[7.625rem] h-[2.0315rem] items-center">
                <span className="text-[2rem] font-semibold">설명</span>
              </div>
              <div className="flex items-start justify-center w-[25rem] h-[6.25rem] rounded-[0.625rem] mt-[1.22rem] border-solid border-[0.00625rem] border-[#B4B4B4] hover:border-[0.125rem] hover:border-darkGray">
                <textarea
                  required
                  placeholder="내용을 입력해주세요."
                  className="flex w-[24rem] h-[6rem] text-[1.25rem] rounded-[0.625rem] text-black px-1 py-[0.63rem] border-none resize-none focus:outline-none"
                />
              </div>
            </div>

            {/* Choose Button */}
            <div className="flex flex-col mt-[2.63rem]">
              <div className="flex w-[5.625rem] h-[2.0315rem] mb-[1.01rem]">
                <span className="text-[2rem] font-semibold">버튼</span>
              </div>
              <div className="flex flex-row gap-3">
                {DIV_ITEMS.map((item) => (
                  <div key={item.id} className="flex flex-col items-center" onClick={() => handleDivClick(item.id)}>
                    <div
                      className={`flex justify-center items-center w-[10.5rem] h-[5.5rem] rounded-[1.5rem] border-solid border-[0.188rem] ${
                        activeDiv === item.id ? 'border-[#918DCA]' : 'border-white'
                      }`}
                    >
                      <div className="flex justify-center items-center w-40 h-20 rounded-[1.25rem] border-solid border-[0.06rem] gap-2 border-[#B4B4B4]">
                        <div
                          className={`flex flex-shrink-0 w-[6.25rem] h-[1.875rem] bg-[#918DCA] ${item.roundedClass}`}
                        />
                      </div>
                    </div>
                    <div className="flex w-[4rem] h-5 justify-center items-center mt-[0.63rem]">
                      <span
                        className={`text-[1rem] font-medium ${activeDiv === item.id ? 'text-black' : 'text-[#B4B4B4]'}`}
                      >
                        {item.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Choose Theme */}
            <div className="flex flex-col mt-[2.63rem]">
              <div className="flex w-[5.625rem] h-[2.0315rem] mb-[1.01rem]">
                <span className="text-[2rem] font-semibold">테마</span>
              </div>
              <div className="flex flex-row items-start">
                <div className="flex flex-col w-[9.75rem] h-[4.5rem] ">
                  <div className="flex flex-shrink-0 flex-row items-center w-[9.75rem] h-[1.875rem] gap-3">
                    {/* Color buttons */}
                    <button
                      aria-label="Select color #918DCA"
                      type="button"
                      className="w-8 h-8 bg-[#918DCA] rounded-full"
                      onClick={() => handleButtonClick('#918DCA')}
                    />
                    <button
                      aria-label="Select color #A3C9F0"
                      type="button"
                      className="w-8 h-8 bg-[#A3C9F0] rounded-full"
                      onClick={() => handleButtonClick('#A3C9F0')}
                    />
                    <button
                      aria-label="Select color #66C03B"
                      type="button"
                      className="w-8 h-8 bg-[#66C03B] rounded-full"
                      onClick={() => handleButtonClick('#66C03B')}
                    />
                    <button
                      aria-label="Select color #E4E91D"
                      type="button"
                      className="w-8 h-8 bg-[#E4E91D] rounded-full"
                      onClick={() => handleButtonClick('#E4E91D')}
                    />
                  </div>
                  <div className="flex flex-shrink-0 flex-row items-center w-[9.75rem] h-[1.875rem] mt-3 gap-3">
                    <button
                      aria-label="Select color #000000"
                      type="button"
                      className="w-8 h-8 bg-[#000000] rounded-full"
                      onClick={() => handleButtonClick('#000000')}
                    />
                    <button
                      aria-label="Select color #B4B4B4"
                      type="button"
                      className="w-8 h-8 bg-[#B4B4B4] rounded-full"
                      onClick={() => handleButtonClick('#B4B4B4')}
                    />
                    <button
                      aria-label="Select color #E90D0D"
                      type="button"
                      className="w-8 h-8 bg-[#E90D0D] rounded-full"
                      onClick={() => handleButtonClick('#E90D0D')}
                    />
                    <button
                      aria-label="Select color #FF9C06"
                      type="button"
                      className="w-8 h-8 bg-[#FF9C06] rounded-full"
                      onClick={() => handleButtonClick('#FF9C06')}
                    />
                  </div>
                </div>
                {/* Color display square */}
                <div
                  className="relative flex w-10 h-10 rounded-[0.625rem] items-center mt-4 ml-[1.56rem]"
                  style={{ backgroundColor: color }}
                  onClick={toggleColorPicker}
                />
                <div className="absolute bottom-[5%] left-1/4  z-10 flex flex-row place-items-start mt-4 ml-4">
                  {showPicker && <SketchPicker color={color} onChangeComplete={handleColorChange} />}
                </div>
              </div>
            </div>

            {/* Choose Font */}
            <div className="flex flex-col mt-[2.63rem]">
              <div className="flex w-[5.625rem] h-[2.0315rem] mb-[1.01rem]">
                <span className="text-[2rem] font-semibold">글꼴</span>
              </div>
              <div className="flex flex-row items-center gap-3">
                {FONT_ITEMS.map((item) => (
                  <div key={item.id} className="flex flex-col items-center" onClick={() => handleFontClick(item.id)}>
                    <div
                      className={`flex justify-center items-center w-[10.5rem] h-[5.5rem] rounded-[1.5rem] border-solid border-[0.188rem] ${
                        activeFont === item.id ? 'border-[#918DCA]' : 'border-white'
                      }`}
                    >
                      <div className="flex justify-center items-center w-40 h-20 rounded-[1.25rem] border-solid border-[0.06rem] border-[#B4B4B4]">
                        <span className={`text-xl ${item.fontClass}`}>{item.text}</span>
                      </div>
                    </div>
                    <div className="flex w-[7.875rem] h-4 justify-center items-center mt-[0.63rem]">
                      <span
                        className={`text-[1rem] font-medium ${item.fontClass} ${
                          activeFont === item.id ? 'text-black' : 'text-[#B4B4B4]'
                        }`}
                      >
                        {item.text}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Choose coverImage */}
            <div className="flex flex-col mt-[2.63rem]">
              <div className="flex flex-row items-end  w-[16rem] h-[2.0315rem] gap-x-4 mb-[1.01rem]">
                <span className="text-[2rem] font-semibold">커버 이미지</span>
                <button
                  type="button"
                  className="flex justify-start items-center focus:outline-none "
                  onClick={handleDeleteImage} // 이미지 삭제
                >
                  <img src={deleteIcon} alt="Delete" className="flex w-5 h-5 ml-15" />
                </button>
              </div>
              <div
                className="flex justify-center items-center w-[18.75rem] h-[12.5rem] border-dashed border-[0.06rem] border-[#b4b4b4]"
                onClick={() => document.getElementById('imageInput')?.click()}
              >
                {imageSrc ? (
                  <img src={imageSrc} alt="Uploaded Cover" className="w-full h-full" />
                ) : (
                  <img src={insertImage} alt="insertImage" className="w-full h-full" />
                )}
                <input
                  id="imageInput"
                  type="file"
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                  accept="image/png, image/jpeg"
                />
              </div>
            </div>

            {/* Choose date */}
            <div className="flex flex-row items-center mt-[2.63rem]">
              <div className="flex w-[6rem] h-[2.0315rem]  ">
                <span className="text-[2rem] font-semibold">마감일</span>
              </div>
              <div className="flex w-[10rem] h-[3.125rem] justify-center ml-5 rounded-[0.625rem] border-solid border-[0.06rem] border-[#b4b4b4]">
                <input type="date" id="date" />
              </div>
            </div>

            {/* Choose survey option */}
            <div className="flex flex-row mt-[2.63rem] mb-[2.38rem]">
              <div className="flex flex-col">
                <div className="flex w-[14rem] h-[2.0315rem] mb-[1.01rem]">
                  <span className="text-[2rem] font-semibold">설문 공개 여부</span>
                </div>
                <div className="flex flex-row gap-3 items-center">
                  {OPTION_ITEMS.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col items-center"
                      onClick={() => handleOptionClick(item.id)}
                    >
                      <div
                        className={`flex justify-center items-center w-[10.5rem] h-[5.5rem] rounded-[1.5rem] border-solid border-[0.188rem] ${
                          selectedOption === item.id ? 'border-[#918DCA]' : 'border-white'
                        }`}
                      >
                        <div className="flex flex-col justify-center items-center w-40 h-20 rounded-[1.25rem] border-solid border-[0.06rem] border-[#B4B4B4]">
                          <img
                            src={item.id === 'public' ? publicIcon : privateIcon}
                            alt={`${item.id}Icon`}
                            className="mb-2"
                          />
                          <span
                            className={`text-[1rem] font-normal ${
                              selectedOption === item.id ? 'text-black' : 'text-[#b4b4b4]'
                            }`}
                          >
                            {item.text}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="flex flex-col ml-10 tracking-widest font-normal text-[1rem] text-[#8E8E8E]">
                    <span className="mb-1">공개: 누구나 설문에 참여 가능하고, 설문 데이터 열람이 가능합니다.</span>
                    <span>비공개: 링크를 통해서만 참여 가능하고, 설문 데이터 열람이 불가능합니다.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Scrollbars>
      </Navbar>
    </div>
  );
}

export default Createstyle;
