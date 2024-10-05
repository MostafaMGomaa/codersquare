import LOGO from '../assets/logo.svg';

export const NavBar = () => {
  return (
    <div className="flex justify-between items-center m-4 navbar">
      <img src={LOGO} alt="Logo" className="h-10 w-auto" />

      <div className="flex auth-buttons">
        <button className="mx-4 text-gray-500 font-semibold text-center hover:text-gray-800 transition-colors duration-300">
          Sign in
        </button>

        <button className="bg-orange-700 hover:bg-orange-800 text-white text-center font-bold py-2 px-4 rounded-md transition-transform duration-300 transform hover:scale-105">
          Sign up
        </button>
      </div>
    </div>
  );
};
