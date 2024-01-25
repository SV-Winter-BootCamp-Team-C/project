import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Lottie from 'react-lottie';
import descriptionOne from '../../assets/descriptionOne.json';
import descriptionTwo from '../../assets/descriptionTwo.json';
import descriptionThree from '../../assets/descriptionThree.json';

function CarouselDesTwo() {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // 자동 재생 활성화
    autoplaySpeed: 5000,
    pauseOnHover: false,
  };
  const defaultOptionsOne = {
    loop: true, // or false, depending on your requirement
    autoplay: true, // or false
    animationData: descriptionOne,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  const defaultOptionsTwo = {
    loop: true, // or false, depending on your requirement
    autoplay: true, // or false
    animationData: descriptionTwo,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  const defaultOptionsThree = {
    loop: true, // or false, depending on your requirement
    autoplay: true, // or false
    animationData: descriptionThree,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <Slider {...settings}>
      <div className="w-fit h-auto rounded-[0.0625rem]">
        <Lottie options={defaultOptionsThree} height={450} width={510} />
      </div>
      <div className="w-fit h-auto rounded-[0.0625rem]">
        <Lottie options={defaultOptionsTwo} height={450} width={510} />
      </div>
      <div className="w-fit h-auto rounded-[0.0625rem]">
        <Lottie options={defaultOptionsOne} height={450} width={510} />
      </div>
    </Slider>
  );
}

export default CarouselDesTwo;
