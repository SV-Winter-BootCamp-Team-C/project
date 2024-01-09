// import Alert from '@/components/common/Alert';
import Navbar from '@/components/common/Navbar';

function Home() {
  return (
    <div className="flex items-center justify-center p-16 bg-custom-gradient">
      <Navbar>
        <div className="p-16">내용</div>
        {/* <Alert message="안녕" buttonText="확인" /> */}
      </Navbar>
    </div>
  );
}

export default Home;
