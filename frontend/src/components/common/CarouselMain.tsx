// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

// interface CarouselProps {
//   images: string[]; // 이미지 URL 배열
// }

// function CarouselMain({ images }: CarouselProps) {
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 2500,
//     arrows: false, // 올바른 옵션으로 수정됨
//     pauseOnHover: true,
//   };

//   return (
//     <div>
//       <Slider {...settings}>
//         {images.map((image, index) => (
//           <div key={index}>
//             <img src={image} alt={`slide-${index}`} style={{ width: '100%', height: 'auto' }} />
//           </div>
//         ))}
//       </Slider>
//     </div>
//   );
// }
// export default CarouselMain;
