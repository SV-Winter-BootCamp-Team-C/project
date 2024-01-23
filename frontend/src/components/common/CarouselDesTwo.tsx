import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function CarouselDesTwo() {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // 자동 재생 활성화
    autoplaySpeed: 3000,
    pauseOnHover: false,
  };

  return (
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
    </Slider>
  );
}

export default CarouselDesTwo;
