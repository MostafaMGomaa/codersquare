import { FormEvent } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { User } from '@codersquare/shared';

import { FormButton, Notification, ShadowButton } from './common';
import LOGO from '../assets/logo.svg';

export const NavBar = () => {
  const navigate = useNavigate();
  const jwt = localStorage.getItem('jwt') || '';
  const user =
    (JSON.parse(localStorage.getItem('user') as string) as Partial<User>) || {};
  const [searchParams] = useSearchParams();
  const nextPage = searchParams.get('next') || '';
  let username = '';

  if (jwt && jwt !== '') {
    username = user.username || '';
  }

  const handleSignoutOnChange = (e: FormEvent) => {
    e.preventDefault();
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleCreatePostButton = (e: FormEvent) => {
    e.preventDefault();
    navigate('/post/create');
  };

  return (
    <div className="flex justify-between items-center p-4">
      <Link to="/" className="h-10">
        <img src={LOGO} alt="Logo" className="h-full" />
      </Link>

      {localStorage.getItem('jwt') ? (
        <div className="flex items-center gap-x-4">
          <FormButton
            text="New Post"
            pendingText="New Post"
            classes="text-sm"
            handleOnClick={handleCreatePostButton}
          />

          <ShadowButton text={`${username} (9)`} href="/me" />
          <Notification />
          <ShadowButton text="Sign out" onClick={handleSignoutOnChange} />
        </div>
      ) : (
        <div className="flex gap-x-4">
          <ShadowButton text="Sign in" href={`/signin?next=${nextPage}`} />

          <Link
            to={`/signup?next=${nextPage}`}
            className="bg-orange-700 hover:bg-orange-800 text-white font-bold py-2 px-4 rounded-md transition-transform duration-400"
          >
            Sign up
          </Link>
        </div>
      )}
    </div>
  );
};
