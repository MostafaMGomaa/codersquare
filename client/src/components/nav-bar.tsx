import { FormEvent } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

import { FormButton, ShadowButton } from './common';
import { JWTPayload } from '../types';
import LOGO from '../assets/logo.svg';

export const NavBar = () => {
  const navigate = useNavigate();
  const jwt = localStorage.getItem('jwt') || '';
  const [searchParams] = useSearchParams();

  const nextPage = searchParams.get('next') || '';

  let username = '';

  if (jwt && jwt !== '') {
    const decodedToken: JWTPayload = jwtDecode(jwt);
    username = decodedToken.username || '';
  }

  const handleSignoutOnChange = (e: FormEvent) => {
    e.preventDefault();
    localStorage.removeItem('jwt');
    navigate('/');
  };

  const handleCreatePostButton = (e: FormEvent) => {
    e.preventDefault();
    navigate('/post/create');
  };

  return (
    <div className="flex justify-between items-center m-4 navbar">
      <Link to="/" className="h-2 min-h-10 min-w-[200px]">
        <img src={LOGO} alt="Logo" className="min-h-10" />
      </Link>

      {localStorage.getItem('jwt') ? (
        <div className="flex">
          <FormButton
            text="New Post"
            pendingText="New Post"
            classes="text-sm"
            handleOnClick={handleCreatePostButton}
          />

          <ShadowButton text={`${username} (9)`} href="/me" />

          <ShadowButton text="Sign out" onClick={handleSignoutOnChange} />
        </div>
      ) : (
        <div className="flex auth-buttons">
          <ShadowButton text="Sign in" href={`/signin?next=${nextPage}`} />

          <Link
            to={`/signup?next=${nextPage}`}
            className="bg-orange-700 hover:bg-orange-800 text-white text-center font-bold py-2 px-4 rounded-md transition-transform duration-400 "
          >
            Sign up
          </Link>
        </div>
      )}
    </div>
  );
};
