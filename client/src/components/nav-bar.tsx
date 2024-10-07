import { FormEvent } from 'react';
import LOGO from '../assets/logo.svg';

const handleSignupBtn = (e: FormEvent) => {
  e.preventDefault();
};

export const NavBar = () => {
  return (
    <div className="flex justify-between items-center m-4 navbar">
      <img src={LOGO} alt="Logo" className="h-10 w-auto" />

      <div className="flex auth-buttons">
        <a
          href="/signin"
          className="flex place-items-center mx-4 text-gray-500 font-semibold text-center hover:text-gray-800 transition-colors duration-300"
        >
          Sign in
        </a>

        <a
          href="/signup"
          className="bg-orange-700 hover:bg-orange-800 text-white text-center font-bold py-2 px-4 rounded-md transition-transform duration-400 "
        >
          Sign up
        </a>
      </div>
    </div>
  );
};
