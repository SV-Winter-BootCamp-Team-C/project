import Lottie from 'react-lottie';
import loading from '../../assets/loading.json';

function Loading() {
  return (
    <div className="fixed inset-0 z-30 flex flex-col items-center justify-center h-screen bg-gray-100 bg-opacity-10">
      <Lottie options={{ loop: true, autoplay: true, animationData: loading }} height={150} width={150} />
      <div>Loading</div>
    </div>
  );
}

export default Loading;
