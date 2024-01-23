import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
// import arrowRight from '../assets/arrowRight.svg';
import iconStart from '../assets/iconStart.svg';
import newIdea from '../assets/newIdea.png';
import teamWork from '../assets/teamWork.png';
// import rectangle from '../assets/rectangle.svg';
// import plus from '../assets/plus.svg';
// import graph1 from '../assets/graph1.svg';
// import graph2 from '../assets/graph2.svg';
import star1 from '../assets/star1.svg';
import star2 from '../assets/star2.svg';
import star3 from '../assets/star3.svg';
import star4 from '../assets/star4.svg';
import star5 from '../assets/star5.svg';
import flexLine from '../assets/flexLine.svg';
import directMessage from '../assets/directMessage.svg';
import editPencil from '../assets/editPencil.svg';
// import palette from '../assets/palette.svg';
import palette1 from '../assets/palette1.svg';
import circleAnalytics from '../assets/circleAnalytics.svg';
import roundShare from '../assets/roundShare.svg';
import survey from '../assets/survey.svg';
// import imacFront from '../assets/imacFront.svg';
import CarouselMain from '../components/common/CarouselMain';
import CarouselDesOne from '../components/common/CarouselDesOne';
import CarouselDesTwo from '../components/common/CarouselDesTwo';

function Start() {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);

  const features = [
    {
      title: 'With our own brand colors',
      description: '당신만의 브랜드 성격을 담은 하나의 특별한 폼을 만들어보세요!',
      image: palette1,
    },
    {
      title: 'Advanced Analytics',
      description: '폼을 이용하여 당신의 브랜드의 관심과 성장을 위한 폼을 만들고 설문 결과도 분석해보세요!',
      image: circleAnalytics,
    },
    {
      title: 'Share Form',
      description: '자신만의 폼을 공유하고 참여자의 가치를 생각해 보세요.',
      image: roundShare,
    },
  ];

  return (
    <div className="relative flex flex-col m-0 bg-white">
      <div className="flex w-[100%] h-full  flex-col items-center justify-center bg-[#F9F8FC]">
        {/* Line */}
        <div className="absolute z-10 w-full h-[18rem] top-[11.5rem]">
          <img src={flexLine} alt="flexLine1" className="w-full" />
        </div>
        <div className="absolute z-10 w-full h-[18rem] top-[28rem]">
          <img src={flexLine} alt="flexLine2" className="w-full" />
        </div>

        {/* Circular sector */}
        {/* <div className="absolute z-10 w-full h-[18rem] top-[37.6rem]">
          <img src={rectangle} alt="rectangle" className="w-full" />
        </div> */}

        <div className="relative w-[85.5rem] h-[59.5rem] rounded-[1.25rem] bg-[#F9F8FC]">
          {/* star */}
          <div className="absolute z-20 w-4 h-4 top-[40.5rem] left-[4.44rem]">
            <img src={star1} alt="star1" />
          </div>
          <div className="absolute z-20 w-4 h-4 top-[23.38rem] left-[5.44rem]">
            <img src={star2} alt="star2" />
          </div>
          <div className="absolute z-20 w-4 h-4 top-[5.25rem] left-[20.38rem]">
            <img src={star3} alt="star3" />
          </div>
          <div className="absolute z-20 w-4 h-4 top-[9.12rem] right-[20rem]">
            <img src={star4} alt="star4" />
          </div>
          <div className="absolute z-20 w-10 h-10 top-[20.25rem] right-[11.94rem]">
            <img src={star5} alt="star5" />
          </div>

          {/* topBar */}
          <div className="flex flex-row w-[74.25rem] h-[3rem] justify-between mx-[7.88rem] mt-9">
            <div className="flex items-center  justify-center w-[10.5rem] h-12 ">
              <span className="text-4xl font-semibold text-black">Form:Flex</span>
            </div>
            <div
              className="flex cursor-pointer items-center justify-center flex-shrink-0  w-[6.5rem] h-[2.875rem] rounded-[1.875rem] bg-white"
              style={{
                boxShadow:
                  '0px 0px 1px 0 rgba(0,0,0,0.3), 0px 1px 4px 0 rgba(0,0,0,0.05), 0px 1px 2px 0.5px rgba(0,0,0,0.1)',
              }}
              onClick={() => navigate('/login')}
            >
              <span className="text-base font-medium leading-4 text-center text-black">Login</span>
            </div>
          </div>

          {/* title */}
          <div className="flex relative z-10 flex-col mt-[4.12rem]">
            {/* centerText */}
            <div className="flex relative z-30 flex-row justify-center items-center w-[31.75rem] h-[4.625rem] mx-[26.88rem] ">
              <span className="text-6xl font-semibold text-black ">Create</span>
              <img src={iconStart} alt="iconStart" className="w-[7.25rem] h-12 mx-2" />
              <span className="text-6xl font-semibold text-black">Share</span>
            </div>
            <div className="flex relative z-30 justify-center items-center w-[38rem] h-[5.125rem] mx-[23.75rem]">
              <span className="text-6xl font-semibold text-black">Form, Analysis easily</span>
            </div>
            <div className="flex relative z-30 justify-center items-center w-[41.75rem] h-6 mt-1 mx-[21.88rem]">
              <span className="text-xl font-medium text-black">
                There are forms you can decorate yourself and various analysis tools.
              </span>
            </div>

            {/* centerImage, centerButton */}
            <div className="relative z-30 flex flex-row items-start justify-center gap-1 mt-7">
              <img src={newIdea} alt="newIdea" className="w-[23.5rem] h-[20.25rem]" />
              <a
                href="/signup"
                className="relative inline-flex items-center justify-center p-4 px-8 py-4 overflow-hidden font-medium text-[#918DCA] transition duration-300 ease-out border-2 border-[#918DCA] border-solid rounded-full shadow-md group"
              >
                <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-[#918DCA] group-hover:translate-x-0 ease">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
                <span className="absolute flex font-medium text-[1.2rem] items-center justify-center w-full h-full text-purple-500 transition-all duration-300 transform group-hover:translate-x-full ease">
                  Get Started
                </span>
                <span className="relative invisible">Get Started</span>
              </a>
              <img src={teamWork} alt="teamWork" className="w-[23.5rem] h-[20.25rem]" />
            </div>
          </div>
          <div className="flex justify-center">
            <div className="flex justify-center items-center w-[74.25rem] h-[28.25rem] rounded-[1.875rem] bg-white border-solid border-[0.065rem] border-slate-950">
              <div className="w-[67.25rem] h-[25rem] bg-gray">
                <CarouselMain />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Analysis */}
      {/* <div className="flex justify-center bg-#f9f8fc">

      </div> */}
      {/* <div className="absolute z-20 left-1/2 transform -translate-x-1/2 top-[39.88rem] w-[74.25rem] h-[28.25rem] rounded-[1.875rem] bg-white border-solid border-[0.065rem] border-slate-950">
        <div />
      </div> */}

      <div className="flex w-[100%] h-[40rem] justify-center bg-[#F9F8FC]">
        <div className="flex flex-col justify-center items-center mt-[11.13rem] ">
          <div className="flex flex-col w-[36rem] h-[5.125rem] justify-center items-center mx-[27rem] mb-16">
            <span className="text-[2rem] font-semibold mb-[0.62rem] select-none">Form Design Flow</span>
            <span className="text-[1.25rem] font-normal text-[#8E8E8E] select-none leading-normal">
              단계에 따라 설문지 폼을 구성해보세요!
            </span>
          </div>
          <div className="flex flex-row w-[61rem] h-[13.375rem] justify-center gap-8">
            <div className="bg-white w-[13.75rem] h-[13.375rem] rounded-lg shadow-lg p-6 flex flex-col items-center justify-center hover:shadow-2xl transition-shadow duration-300 ease-in-out">
              <div className="flex w-20 h-20 justify-center items-center rounded-[1.25rem] mb-[1.5rem] bg-[#d9d9d9]">
                <img src={editPencil} alt="editPencil" className="w-10 h-10 mx-5 my-5" />
              </div>
              <div className="flex w-[11rem] h-16 justify-center items-center">
                <span className="text-[1.4rem] text-center font-semibold leading-normal select-none">
                  Create
                  <br />a Survey Form
                </span>
              </div>
            </div>
            <div className="bg-white w-[13.75rem] h-[13.375rem] rounded-lg shadow-lg p-6 flex flex-col items-center justify-center hover:shadow-2xl transition-shadow duration-300 ease-in-out">
              <div className="flex w-20 h-20 justify-center items-center rounded-[1.25rem] mb-[1.5rem] bg-[#d9d9d9]">
                <img src={palette1} alt="palette1" className="w-10 h-10 mx-5 my-5" />
              </div>
              <div className="flex w-[10rem] h-16 justify-center items-center">
                <span className="text-[1.4rem] text-center font-semibold leading-normal select-none">
                  Survey Form
                  <br />
                  Style Settings
                </span>
              </div>
            </div>
            <div className="bg-white w-[13.75rem] h-[13.375rem] rounded-lg shadow-lg p-6 flex flex-col items-center justify-center hover:shadow-2xl transition-shadow duration-300 ease-in-out">
              <div className="flex w-20 h-20 justify-center items-center rounded-[1.25rem] mb-[1.5rem] bg-[#d9d9d9]">
                <img src={survey} alt="survey" className="w-10 h-10 mx-5 my-5" />
              </div>
              <div className="flex w-[12rem] h-16 justify-center items-center">
                <span className="text-[1.4rem] text-center font-semibold leading-normal select-none">
                  Responding to
                  <br />a different form
                </span>
              </div>
            </div>
            <div className="bg-white w-[13.75rem] h-[13.375rem] rounded-lg shadow-lg p-6 flex flex-col items-center justify-center hover:shadow-2xl transition-shadow duration-300 ease-in-out">
              <div className="flex w-20 h-20 justify-center items-center rounded-[1.25rem] mb-[1.5rem] bg-[#d9d9d9]">
                <img src={roundShare} alt="roundShare" className="w-10 h-10 mx-5 my-5" />
              </div>
              <div className="flex w-[12rem] h-16 justify-center items-center">
                <span className="text-[1.4rem] text-center font-semibold leading-normal select-none">
                  Share
                  <br />a survey
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Description 1 */}
      <div className="flex w-[100%] h-[40rem] justify-center bg-white">
        <div className="flex flex-row items-center mx-16 my-[4.37rem]">
          <div className="flex flex-col">
            <div className="w-[40.875rem] h-[31.1875rem]">
              <div className="w-[32.25rem] h-[3.125rem] pb-[0.75rem]">
                <span className="font-semibold text-[2rem] text-start select-none">Features of easy form design</span>
              </div>
              <div className="w-[25.875rem] h-[5rem] pb-[2.12rem]">
                <span className="font-normal text-[1rem] text-start leading-snug select-none">
                  FormFlex를 사용하면 직접 폼을 만들고 설문조사 분석을 경험하고 해당 내용에 대하여 공유할 수 있습니다.
                </span>
              </div>
              <CarouselDesOne setActiveIndex={setActiveIndex} />
            </div>
          </div>
          <div className="flex flex-col w-[33.75rem] h-[31.25rem] ml-[7.37rem]">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="flex flex-row w-[33.75rem] h-[9.375rem] bg-[#F9F8FC] rounded-[0.625rem] mt-6"
              >
                <div
                  className={`transition-colors duration-300 ease-in-out flex w-[0.75rem] h-[9.375rem] ${index === activeIndex ? 'bg-[#918DCA]' : 'bg-[#D9D9D9]'}`}
                />
                <div className="flex flex-col w-[30.5rem] h-[5.625rem] justify-center mt-[1.87rem] pl-4">
                  <div className="flex flex-row items-center gap-2">
                    <img src={feature.image} alt={feature.title} className="w-7 h-7" />
                    <span className="text-2xl font-semibold select-none">{feature.title}</span>
                  </div>
                  <p className="mt-2 text-lg select-none">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Description 2 */}
      <div className="flex w-[100%] h-[40rem] justify-center bg-[#918dca]">
        <div className="flex flex-row items-center mx-16 my-2">
          <div className="flex flex-col">
            <div className="w-[41.5rem] h-[6.5rem]">
              <span className="font-bold leading-normal text-[2.25rem] text-white select-none">
                Create your own design form for free. Share it with others, too!
              </span>
            </div>
            <div className="flex w-[46.5rem] h-[4.375rem] mt-2 text-start">
              <span className="text-[1.5rem] leading-normal font-normal text-white select-none">
                비즈니스를 위한 강력한 도구와 함께 대시보드 내부에서
                <br />
                완벽한 커스터마이징을 경험할 수 있는 FormFlex
              </span>
            </div>
          </div>
          <div className="w-[32.5rem] h-[23rem] bg-[#918dca]">
            <CarouselDesTwo />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-center w-[100%] h-[33.75rem]">
        <div className="flex w-[82.5rem] h-[12.5rem] mt-[10rem] mr-[3.75rem]">
          <div className="flex flex-row px-[3.75rem]">
            <div className="flex mr-16   w-[12rem] h-[2.875rem] justify-start">
              <div className="flex flex-col">
                <div className=" flex w-[12rem] h-[2.875rem] justify-center">
                  <span className="flex text-4xl font-semibold select-none">Form : Flex</span>
                </div>
                <div className="w-[18.25rem] h-[6rem] justify-center mt-6 ">
                  <span className="font-normal text-[0.75rem] leading-normal select-none">
                    FormFlex를 사용하면 비즈니스에
                    <br />
                    적합한 강력한 도구를 대시보드 내부에서
                    <br />
                    완벽한 커스터마이징을 경험할 수 있습니다.
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col mr-14">
            <div className="flex">
              <span className="text-[1.5rem] font-semibold select-none">Company</span>
            </div>
            <div className="flex text-[1.25rem] font-medium mt-6">
              <span className="flex font-medium align-middle transition-transform cursor-pointer hover:scale-110 hover:-translate-y-1">
                Home
              </span>
            </div>
            <div className="flex text-[1.25rem] font-medium mt-4">
              <span className="flex font-medium align-middle transition-transform cursor-pointer hover:scale-110 hover:-translate-y-1">
                How it works
              </span>
            </div>
            <div className="flex text-[1.25rem] font-medium mt-4">
              <span className="flex font-medium align-middle transition-transform cursor-pointer hover:scale-110 hover:-translate-y-1">
                Pricing Plan
              </span>
            </div>
            <div className="flex text-[1.25rem] font-medium mt-4">
              <span className="flex font-medium align-middle transition-transform cursor-pointer hover:scale-110 hover:-translate-y-1">
                Features
              </span>
            </div>
            <div className="flex text-[1.25rem] font-medium mt-4">
              <span className="flex font-medium align-middle transition-transform cursor-pointer hover:scale-110 hover:-translate-y-1">
                About us
              </span>
            </div>
          </div>
          <div className="flex flex-col mr-14">
            <div className="flex">
              <span className="text-[1.5rem] font-semibold select-none">Useful Links</span>
            </div>
            <div className="flex text-[1.25rem] font-medium mt-6">
              <span className="flex font-medium align-middle transition-transform cursor-pointer hover:scale-110 hover:-translate-y-1">
                Licenses
              </span>
            </div>
            <div className="flex text-[1.25rem] font-medium mt-4">
              <span className="flex font-medium align-middle transition-transform cursor-pointer hover:scale-110 hover:-translate-y-1">
                Privacy Policy
              </span>
            </div>
            <div className="flex text-[1.25rem] font-medium mt-4">
              <span className="flex font-medium align-middle transition-transform cursor-pointer hover:scale-110 hover:-translate-y-1">
                Terms & Conditions
              </span>
            </div>
            <div className="flex text-[1.25rem] font-medium mt-4">
              <span className="flex font-medium align-middle transition-transform cursor-pointer hover:scale-110 hover:-translate-y-1">
                Security Updates
              </span>
            </div>
          </div>
          <div className="flex flex-col mr-14">
            <div className="flex">
              <span className="text-[1.5rem] font-semibold select-none">Support</span>
            </div>
            <div className="flex text-[1.25rem] font-medium mt-6">
              <span className="flex font-medium align-middle transition-transform cursor-pointer hover:scale-110 hover:-translate-y-1">
                Contact Us
              </span>
            </div>
            <div className="flex text-[1.25rem] font-medium mt-4">
              <span className="flex font-medium align-middle transition-transform cursor-pointer hover:scale-110 hover:-translate-y-1">
                Help Center
              </span>
            </div>
            <div className="flex text-[1.25rem] font-medium mt-4">
              <span className="flex font-medium align-middle transition-transform cursor-pointer hover:scale-110 hover:-translate-y-1">
                Support Ticket
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex">
              <span className="text-[1.5rem] font-semibold select-none">Subscribe To Our Newsletter</span>
            </div>
            <div className="flex text-[1rem] font-medium mt-6">
              <span className="flex h-16 font-medium leading-normal align-middle select-none w-74">
                최신 뉴스, 제안 및 업데이트를 보려면
                <br />
                뉴스레터에 가입하십시오.
              </span>
            </div>
            <div className="flex flex-row items-center justify-start align-middle">
              <div className="flex flex-row items-center justify-center">
                <div className="flex w-[13.125rem] h-[3rem] border-solid border-[0.063rem] border-black rounded-[0.625rem] bg-white justify-center items-center py-3 pl-4">
                  <input
                    type="text"
                    placeholder="Enter your email"
                    className="flex w-[11.125rem] h-[1.5rem]  text-start align-center text-[1rem] leading-normal font-normal"
                  />
                </div>
                <div className="flex cursor-pointer w-12 h-12 rounded-[0.625rem] mx-2 justify-center items-center bg-[#918dca]">
                  <img src={directMessage} alt="directMessage" className="w-6 h-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* End */}
    </div>
  );
}

export default Start;
