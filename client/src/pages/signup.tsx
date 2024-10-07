import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';

import { useSignupMutation } from '../api';
import { SignupPayload } from '../types';
import { useNavigate } from 'react-router-dom';

export const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [hoverInput, setHoverInput] = useState<{ [key: string]: boolean }>({
    email: false,
    firstName: false,
    lastName: false,
    password: false,
  });
  const navigate = useNavigate();
  const signupMutation = useSignupMutation();

  const handleFocus = (inputName: string) => {
    setFocusedInput(inputName);
  };

  const handleHover = (inputName: string, isHover: boolean) => {
    setHoverInput((prev) => ({ ...prev, [inputName]: isHover }));
  };

  const handleBlur = () => {
    setFocusedInput(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const payloadData: SignupPayload = {
      email,
      firstName,
      lastName,
      password,
    };

    try {
      await signupMutation.mutateAsync(payloadData);
      toast.success('Successfully Signup!');
      setTimeout(() => {
        navigate('/');
      }, 10 * 100);
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Signup failed';
      toast.error(error || 'Signup failed', {
        position: 'bottom-center',
      });
    }
  };

  const getInputClasses = (inputName: string) => {
    const isFocused = focusedInput === inputName;
    const isHovered = hoverInput[inputName] ? true : false;
    return `border ${
      isFocused || isHovered ? 'border-orange-700' : 'border-gray-500'
    } 
          rounded bg-transparent h-9 w-[20rem] transition-colors duration-300 
          p-2 outline-none shadow-none focus:ring-0 focus:ring-transparent`;
  };

  const getLabelClasses = (inputName: string) => {
    const isFocused = focusedInput === inputName;
    const isHovered = hoverInput[inputName] ? true : false;
    return `font-semibold w-40 ${
      isFocused || isHovered ? 'text-orange-700' : 'text-gray-500'
    }`;
  };

  return (
    <div className="m-10 mt-24">
      <form className="flex flex-col gap-10" onSubmit={handleSubmit}>
        <div className="email flex">
          <label className={getLabelClasses('email')} htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={getInputClasses('email')}
            onFocus={() => handleFocus('email')}
            onMouseEnter={() => handleHover('email', true)}
            onMouseLeave={() => handleHover('email', false)}
            onBlur={handleBlur}
            required
          />
        </div>

        <div className="firstName flex">
          <label className={getLabelClasses('firstName')} htmlFor="firstName">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className={getInputClasses('firstName')}
            onFocus={() => handleFocus('firstName')}
            onMouseEnter={() => handleHover('firstName', true)}
            onMouseLeave={() => handleHover('firstName', false)}
            onBlur={handleBlur}
            required
          />
        </div>

        <div className="lastName flex">
          <label className={getLabelClasses('lastName')} htmlFor="lastName">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className={getInputClasses('lastName')}
            onFocus={() => handleFocus('lastName')}
            onMouseEnter={() => handleHover('lastName', true)}
            onMouseLeave={() => handleHover('lastName', false)}
            onBlur={handleBlur}
            required
          />
        </div>

        <div className="password flex">
          <label className={getLabelClasses('password')} htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={getInputClasses('password')}
            onFocus={() => handleFocus('password')}
            onMouseEnter={() => handleHover('password', true)}
            onMouseLeave={() => handleHover('password', false)}
            onBlur={handleBlur}
            required
          />
        </div>

        <button
          type="submit"
          disabled={signupMutation.isPending}
          className="bg-orange-700 hover:bg-orange-800 text-white text-center font-bold py-2 px-4 rounded-md transition-transform duration-400 w-[6rem] ml-40"
        >
          {signupMutation.isPending ? 'Signing up...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};
