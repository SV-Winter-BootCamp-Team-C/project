import { Link } from 'react-router-dom';
import fileImage from '../assets/file.png';
import emailIcon from '../assets/email.svg';
import passwordIcon from '../assets/password.svg';

function Login() {
  return (
    <div className="flex items-center justify-center h-screen bg-custom-gradient">
      <div className="relative flex items-start w-[57.5rem] h-[45.25rem] rounded-[2.5rem] bg-custom-gradient-re shadow-lg">
        <div className="flex flex-col items-center justify-center w-full">
          <span className="text-[2rem] pt-[5rem] font-semibold text-center text-white">Form : Flex</span>
          <div className="absolute bottom-[4.75rem] left-[3.5rem]">
            <img src={fileImage} alt="File" className="w-[21.25rem] h-[26.25rem]" />
          </div>
        </div>
        <div className="flex justify-end w-full">
          <div className="w-[35rem] h-[45.25rem] rounded-[2.5rem] bg-white shadow-lg flex flex-col items-center">
            <span className="pt-[9.25rem] text-[2rem] font-bold text-black">Login</span>
            <div className="pt-[5.625rem] ">
              <div className="flex items-center w-[25rem] h-[3.75rem] mb-[1.25rem] rounded-[1.875rem] border-solid border-[0.00625rem] border-gray hover:border-[0.125rem] hover:border-darkGray">
                <input
                  type="email"
                  required
                  placeholder="email"
                  className="w-full h-[3.75rem] text-[1rem] text-black pl-[1.875rem] focus:outline-none"
                />
                <img src={emailIcon} alt="Email" className="w-[2.25rem] h-[2.25rem] inline-block mr-[1.875rem]" />
              </div>
              <div className="flex items-center w-[25rem] h-[3.75rem] rounded-[1.875rem] border-solid border-[0.00625rem] border-gray hover:border-[0.125rem] hover:border-darkGray">
                <input
                  type="password"
                  required
                  placeholder="Password"
                  className="w-full h-[3.75rem] text-[1rem] text-black pl-[1.875rem] focus:outline-none"
                />
                <img src={passwordIcon} alt="Password" className="w-[2.25rem] h-[2.25rem] inline-block mr-[1.875rem]" />
              </div>
            </div>
            <div className="pt-[2.5rem]">
              <button
                type="button"
                className="w-[12.5rem] h-[3.125rem] text-[1.25rem] bg-purple text-white font-bold py-[0.9375rem] px-[3.75rem] rounded-[0.625rem] hover:bg-darkPurple shadow-lg transition duration-300 ease-in-out"
              >
                로그인
              </button>
            </div>
            <Link
              to="/signup"
              className="pt-[1.25rem] text-darkGray text-[1rem] underline hover:text-black transition duration-300 ease-in-out"
            >
              회원가입
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
