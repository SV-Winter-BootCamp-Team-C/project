// import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function CarouselMain() {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    arrow: false,
    pauseOnHover: true,
  };

  return (
    <div>
      <Slider {...settings}>
        <div className="w-[15rem] h-[25rem] bg-white">
          <div className="flex flex-col w-[20rem] h-[25rem] justify-center items-center rounded-lg mx-[0.94rem]  border-2 border-solid border-black">
            <div className="flex w-40 h-40 justify-center items-center bg-black py-6" />
            <span className="font-semibold text-[1.25rem] text-center leading-normal mt-[1.37rem]">
              2023 최고의 영화는?
            </span>
            <span className="font-normal text-[1rem] text-center leading-normal mt-6">
              작년 재밌게 본<br />
              영화는 무엇인가요?
            </span>
            <button
              type="button"
              className="w-[7.5rem] h-[3rem] mt-[1.37rem] bg-[#D9D9D9] text-black text-[1.25rem] font-medium leading-normal rounded-lg"
            >
              설문하기
            </button>
          </div>
        </div>
        <div className="w-[15rem] h-[25rem] bg-white">
          <div className="flex flex-col w-[20rem] h-[25rem] justify-center items-center rounded-lg mx-[0.94rem]  border-2 border-solid border-black">
            <div className="flex w-40 h-40 justify-center items-center bg-black py-6" />
            <span className="font-semibold text-[1.25rem] text-center leading-normal mt-[1.37rem]">최악의 반찬은?</span>
            <span className="font-normal text-[1rem] text-center leading-normal mt-6">
              밥상에 이거 올라오면
              <br />
              밥상 뒤엎는 반찬은?
            </span>
            <button
              type="button"
              className="w-[7.5rem] h-[3rem] mt-[1.37rem] bg-[#D9D9D9] text-black text-[1.25rem] font-medium leading-normal rounded-lg"
            >
              설문하기
            </button>
          </div>
        </div>
        <div className="w-[15rem] h-[25rem] bg-white">
          <div className="flex flex-col w-[20rem] h-[25rem] justify-center items-center rounded-lg mx-[0.94rem]  border-2 border-solid border-black">
            <div className="flex w-40 h-40 justify-center items-center bg-black py-6" />
            <span className="font-semibold text-[1.25rem] text-center leading-normal mt-[1.37rem]">
              내 약혼자는 이정도!
            </span>
            <span className="font-normal text-[1rem] text-center leading-normal mt-6">
              나의 약혼자는
              <br />
              최소 이정도이어야 한다!
            </span>
            <button
              type="button"
              className="w-[7.5rem] h-[3rem] mt-[1.37rem] bg-[#D9D9D9] text-black text-[1.25rem] font-medium leading-normal rounded-lg"
            >
              설문하기
            </button>
          </div>
        </div>
        <div className="w-[15rem] h-[25rem] bg-white">
          <div className="flex flex-col w-[20rem] h-[25rem] justify-center items-center rounded-lg mx-[0.94rem]  border-2 border-solid border-black">
            <div className="flex w-40 h-40 justify-center items-center bg-black py-6" />
            <span className="font-semibold text-[1.25rem] text-center leading-normal mt-[1.37rem]">
              제66회 그래미 어워드
            </span>
            <span className="font-normal text-[1rem] text-center leading-normal mt-6">
              제66회 그래미 어워드
              <br />
              수상자 예상해보기!
            </span>
            <button
              type="button"
              className="w-[7.5rem] h-[3rem] mt-[1.37rem] bg-[#D9D9D9] text-black text-[1.25rem] font-medium leading-normal rounded-lg"
            >
              설문하기
            </button>
          </div>
        </div>
      </Slider>
    </div>
  );
}

export default CarouselMain;
