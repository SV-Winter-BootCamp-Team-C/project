import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styleSetting from '../../assets/styleSetting.gif';
import shareMail from '../../assets/shareMail.gif';

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
    autoplaySpeed: 10000,
    pauseOnHover: false,
    beforeChange: (_: number, next: number) => setActiveIndex(next),
  };

  return (
    <Slider {...settings}>
      <div className="w-[12rem] h-[25rem]">
        <img src={styleSetting} alt="styleSetting" className="w-fit h-fit" />
      </div>
      <div className="w-[12rem] h-[25rem] bg-red-500">
        <h3>2</h3>
      </div>
      <div className="w-[12rem] h-[25rem]">
        <img src={shareMail} alt="shareMail" className="w-fit h-fit " />
      </div>
    </Slider>
  );
}

export default CarouselDesOne;
