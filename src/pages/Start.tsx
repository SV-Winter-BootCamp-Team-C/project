import arrowRight from '../assets/arrowRight.svg';
import iconStart from '../assets/iconStart.svg';
import newIdea from '../assets/newIdea.png';
import teamWork from '../assets/teamWork.png';
import rectangle from '../assets/rectangle.svg';
import plus from '../assets/plus.svg';
import graph1 from '../assets/graph1.svg';
import graph2 from '../assets/graph2.svg';
import star1 from '../assets/star1.svg';
import star2 from '../assets/star2.svg';
import star3 from '../assets/star3.svg';
import star4 from '../assets/star4.svg';
import star5 from '../assets/star5.svg';

function Start() {
  return (
    <div className=" flex relative items-center justify-center m-9 bg-white">
      {/* inner background */}
      <div className="relative w-[85.5rem] h-[59.5rem] rounded-[1.25rem] bg-[#F9F8FC]">
        {/* star */}
        <div className="absolute w-4 h-4 top-[40.5rem] left-[4.44rem]">
          <img src={star1} alt="star1" />
        </div>
        <div className="absolute w-4 h-4 top-[23.38rem] left-[5.44rem]">
          <img src={star2} alt="star2" />
        </div>
        <div className="absolute w-4 h-4 top-[5.25rem] left-[20.38rem]">
          <img src={star3} alt="star3" />
        </div>
        <div className="absolute w-4 h-4 top-[9.12rem] right-[20rem]">
          <img src={star4} alt="star4" />
        </div>
        <div className="absolute w-4 h-4 top-[20.25rem] right-[11.94rem]">
          <img src={star5} alt="star5" />
        </div>

        {/* topBar */}
        <div className="flex flex-row-reverse justify-center items-center mt-9">
          <div
            className="flex items-center justify-center w-[8.125rem] h-[2.875rem] mr-10 rounded-[1.875rem] bg-[#918dca]"
            style={{
              boxShadow:
                '0px 0px 1px 0 rgba(0,0,0,0.16), 0px 1px 4px 0 rgba(0,0,0,0.05), 0px 1px 2px 0.5px rgba(0,0,0,0.1)',
            }}
          >
            <span className="text-base text-center text-white font-medium">Get Started</span>
            <img src={arrowRight} alt="arrowRight" className="w-5 h-5" />
          </div>
          <div
            className="flex items-center justify-center flex-shrink-0  w-[6.5rem] h-[2.875rem] mr-4 rounded-[1.875rem] bg-white"
            style={{
              boxShadow:
                '0px 0px 1px 0 rgba(0,0,0,0.3), 0px 1px 4px 0 rgba(0,0,0,0.05), 0px 1px 2px 0.5px rgba(0,0,0,0.1)',
            }}
          >
            <span className="text-base text-center text-black font-medium">Login</span>
          </div>
          <div className="flex items-center justify-center w-[10.5rem] h-12 mr-[54.37rem] ml-10">
            <span className="font-semibold text-4xl text-black">Form:Flex</span>
          </div>
        </div>

        {/* title */}
        <div className="z-20 flex flex-col mt-[4.12rem]">
          {/* centerText */}
          <div className="flex flex-row justify-center items-center w-[31.75rem] h-[4.625rem] mx-[26.88rem] ">
            <span className="text-6xl text-black font-semibold ">Create</span>
            <img src={iconStart} alt="iconStart" className="w-[7.25rem] h-12 mx-2" />
            <span className="text-6xl text-black font-semibold">Share</span>
          </div>
          <div className="flex justify-center items-center w-[38rem] h-[5.125rem] mx-[23.75rem]">
            <span className="text-6xl text-black font-semibold">Form, Analysis easily</span>
          </div>
          <div className="flex justify-center items-center w-[41.75rem] h-6 mt-1 mx-[21.88rem]">
            <span className="text-xl text-black font-medium">
              There are forms you can decorate yourself and various analysis tools.
            </span>
          </div>

          {/* centerImage, centerButton */}
          <div className="flex flex-row justify-center items-start mt-7 gap-1">
            <img src={newIdea} alt="newIdea" className="w-[23.5rem] h-[20.25rem]" />
            <div className="flex justify-center items-center w-60 h-[4.625rem] rounded-[1.875rem] bg-[#918dca]">
              <div className="flex items-center">
                <span className="text-[1.5rem] text-white font-medium">Create Now</span>
              </div>
              <img src={arrowRight} alt="arrowRight" className="w-[1.875rem] h-[1.875rem]" />
            </div>
            <img src={teamWork} alt="teamWork" className="w-[23.5rem] h-[20.25rem]" />
          </div>
        </div>
        <div className="absolute bottom-0 w-[85.5rem] h-[15.75rem]">
          <img src={rectangle} alt="rectangle" />
        </div>
      </div>

      {/* Analysis */}
      <div className="absolute left-1/2 transform -translate-x-1/2 top-[39.88rem] w-[62.5rem] h-[24.125rem] rounded-[1.875rem] bg-white">
        <div className="flex flex-col mt-9">
          <div className="flex flex-row mx-[3.25rem] justify-center items-center">
            <div className="flex">
              <span className=" text-[2rem] text-black font-semibold">Analysis of this survey</span>
            </div>
            <div className="flex w-[14.5rem] h-[3.125rem] justify-center items-center ml-[18rem] gap-2 rounded-[30px]  bg-[#918dca]">
              <div className="flex items-center">
                <span className="text-[1.5rem]  text-white font-medium">New analysis</span>
              </div>
              <img src={plus} alt="plus" className="w-[1rem] h-[1rem] " />
            </div>
          </div>
          <div className="flex justify-center items-center mt-5 mx-[9.38rem]">
            <div className="flex">
              <img src={graph1} alt="graph1" className="w-[17.5rem] h-[14.25rem]" />
            </div>
            <div className="flex ml-[8.75rem]">
              <img src={graph2} alt="graph2" className="w-[17.5rem] h-[14.25rem]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Start;
