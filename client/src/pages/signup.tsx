import { FormEvent, useState } from 'react';
import { useSignupMutation } from '../api';
import { SignupPayload } from '../types';

export const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const signupMutation = useSignupMutation();

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
      // TODO: Show alert
      alert('Signup successull!');
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Signup failed');
    }
  };

  //   const labelStyle = '';
  //   const inputStyle = '';

  return (
    <div className="m-10 mt-24">
      <form className="flex flex-col gap-10" onSubmit={handleSubmit}>
        <div className="email flex">
          <label className="text-gray-500 font-semibold w-40" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-500 rounded bg-transparent h-9 focus:border-orange-700 hover:border-orange-700 w-[20rem]"
            required
          />
        </div>

        <div className="firstName flex">
          <label
            className="text-gray-500 font-semibold w-40"
            htmlFor="firstName"
          >
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="border border-gray-500 rounded bg-transparent h-9 focus:border-orange-700 hover:border-orange-700 w-[20rem]"
            required
          />
        </div>

        <div className="lastName flex">
          <label
            className="text-gray-500 font-semibold w-40"
            htmlFor="lastName"
          >
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="border border-gray-500 rounded bg-transparent h-9 focus:border-orange-700 hover:border-orange-700 w-[20rem]"
            required
          />
        </div>

        <div className="password flex">
          <label
            className="text-gray-500 font-semibold w-40"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-500 rounded bg-transparent h-9 focus:border-orange-700 hover:border-orange-700 w-[20rem]"
            required
          />
        </div>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <button
          type="submit"
          disabled={signupMutation.isPending}
          className="bg-orange-700 hover:bg-orange-800 text-white text-center font-bold py-2 px-4 rounded-md transition-transform duration-400 w-[6rem] ml-40"
        >
          {signupMutation.isPending ? 'Signing up...' : 'Sign Up'}
        </button>
      </form>

      {signupMutation.isSuccess && <p>Signup successful!</p>}
    </div>
  );
};
