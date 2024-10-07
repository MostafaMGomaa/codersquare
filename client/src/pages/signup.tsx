import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';

import { useSignupMutation } from '../api';
import { SignupPayload } from '../types';
import { useNavigate } from 'react-router-dom';

export const SignupForm = () => {
  const [signupData, setSignupData] = useState<SignupPayload>({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
  });

  const navigate = useNavigate();
  const signupMutation = useSignupMutation();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await signupMutation.mutateAsync(signupData);
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

  const handleSignupDate = (inputName: string, inputValue: string) => {
    setSignupData((values: SignupPayload) => ({
      ...values,
      [inputName]: inputValue,
    }));
  };

  const getInputClasses = () => {
    return `border border-gray-500 
          group-hover:border-orange-700 rounded bg-transparent h-9 w-[20rem] transition-colors duration-300 
          p-2 outline-none shadow-none focus:ring-0 focus:ring-transparent group-focus-within:border-orange-700`;
  };

  const getLabelClasses = () => {
    return `font-semibold w-40 group-hover:text-orange-700 text-gray-500 group-focus-within:text-orange-700`;
  };

  return (
    <div className="m-10 mt-24">
      <form className="flex flex-col gap-10" onSubmit={handleSubmit}>
        <div className="email flex group">
          <label className={getLabelClasses()} htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={signupData.email}
            onChange={(e) => handleSignupDate('email', e.target.value)}
            className={getInputClasses()}
            required
          />
        </div>

        <div className="firstName flex group">
          <label className={getLabelClasses()} htmlFor="firstName">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            value={signupData.firstName}
            onChange={(e) => handleSignupDate('firstName', e.target.value)}
            className={getInputClasses()}
            required
          />
        </div>

        <div className="lastName flex group">
          <label className={getLabelClasses()} htmlFor="lastName">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            value={signupData.lastName}
            onChange={(e) => handleSignupDate('lastName', e.target.value)}
            className={getInputClasses()}
            required
          />
        </div>

        <div className="password flex group">
          <label className={getLabelClasses()} htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={signupData.password}
            onChange={(e) => handleSignupDate('password', e.target.value)}
            className={getInputClasses()}
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
