import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface CustomSliderProps {
  setActiveIndex: (index: number) => void;
}

function CarouselDesOne({ setActiveIndex }: CustomSliderProps) {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: false,
    beforeChange: (_: number, next: number) => setActiveIndex(next),
  };

  return (
    <Slider {...settings}>
      <div className="w-[12rem] h-[25rem] bg-black">
        <h3>1</h3>
      </div>
      <div className="w-[12rem] h-[25rem] bg-red-500">
        <h3>2</h3>
      </div>
      <div className="w-[12rem] h-[25rem] bg-blue-500">
        <h3>3</h3>
      </div>
    </Slider>
  );
}

export default CarouselDesOne;
