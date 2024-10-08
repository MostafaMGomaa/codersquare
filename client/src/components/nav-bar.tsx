import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import LOGO from '../assets/logo.svg';
import { FormButton } from './form-button';
import { ShadowButton } from './shadow-button';
import { JWTPayload } from '../types';
import { FormEvent } from 'react';

export const NavBar = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const jwt = localStorage.getItem('jwt') || '';
  let username = '';

  if (jwt && jwt !== '') {
    const decodedToken: JWTPayload = jwtDecode(jwt);
    username = decodedToken.email.split('@')[0] || '';
  }

  const handleSignoutOnChange = (e: FormEvent) => {
    e.preventDefault();
    localStorage.removeItem('jwt');
    navigate('/'); // Navigate to the home page after signing out
  };

  return (
    <div className="flex justify-between items-center m-4 navbar">
      <img src={LOGO} alt="Logo" className="h-10 w-auto" />

      {localStorage.getItem('jwt') ? (
        <div className="flex">
          <FormButton
            text="New Post"
            pendingText="New Post"
            classes="text-sm"
          />

          <ShadowButton text={`${username} (9)`} />

          <ShadowButton text="Sign out" onClick={handleSignoutOnChange} />
        </div>
      ) : (
        <div className="flex auth-buttons">
          <ShadowButton text="Sign in" href="/signin" />

          <a
            href="/signup"
            className="bg-orange-700 hover:bg-orange-800 text-white text-center font-bold py-2 px-4 rounded-md transition-transform duration-400 "
          >
            Sign up
          </a>
        </div>
      )}
    </div>
  );
};
