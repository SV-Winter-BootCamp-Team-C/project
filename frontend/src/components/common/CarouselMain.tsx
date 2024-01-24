// import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function CenterMode() {
  const settings = {
    className: 'center',

    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    arrow: false,
    pauseOnHover: false,
  };

  return (
    <div>
      <Slider {...settings}>
        <div className="w-[12rem] h-[25rem] bg-black">
          <h3>1</h3>
        </div>
        <div className="w-[12rem] h-[25rem] bg-blue-700">
          <h3>2</h3>
        </div>
        <div className="w-[12rem] h-[25rem] bg-gray">
          <h3>3</h3>
        </div>
        <div className="w-[12rem] h-[25rem]  bg-amber-400">
          <h3>4</h3>
        </div>
      </Slider>
    </div>
  );
}

export default CenterMode;
