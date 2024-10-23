import { FormEvent, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';

import { useSignupMutation } from '../../api';
import { FormButton, FormInput } from '../../components';
import { SignupPayload } from '../../types';
import { FormLink } from '../../components/common/form-link';

export const SignupForm = () => {
  const [signupData, setSignupData] = useState<SignupPayload>({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    about: '',
    username: '',
  });

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const signupMutation = useSignupMutation();

  const nextPage = searchParams.get('next') || '/';

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await signupMutation.mutateAsync(signupData);
      toast.success('Successfully Signup!');
      setTimeout(() => {
        navigate(nextPage);
      }, 10 * 100);
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Signup failed';
      toast.error(error || 'Signup failed', {
        position: 'bottom-center',
      });
    }
  };

  const handleSignupData = (inputName: string, inputValue: string) => {
    setSignupData((values: SignupPayload) => ({
      ...values,
      [inputName]: inputValue,
    }));
  };

  const inputClasses = `border border-gray-500 
          group-hover:border-orange-700 rounded bg-transparent h-9 w-[20rem] transition-colors duration-300 
          p-2 outline-none shadow-none focus:ring-0 focus:ring-transparent group-focus-within:border-orange-700`;
  const labelClasses = `relative font-semibold w-40 group-hover:text-orange-700 text-gray-500 group-focus-within:text-orange-700`;

  return (
    <div className="m-10 ml-18 mt-18">
      <form className="flex flex-col gap-10" onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          field="email"
          value={signupData.email}
          onChange={handleSignupData}
          parentDivClasses="email"
          inputClasses={inputClasses}
          labelClasses={labelClasses}
        />
        <FormInput
          label="First Name"
          type="text"
          value={signupData.firstName}
          onChange={handleSignupData}
          field="firstName"
          labelClasses={labelClasses}
          inputClasses={inputClasses}
        />
        <FormInput
          label="Last Name"
          type="text"
          value={signupData.lastName}
          onChange={handleSignupData}
          field="lastName"
          labelClasses={labelClasses}
          inputClasses={inputClasses}
        />
        <FormInput
          label="Username"
          type="text"
          value={signupData.username}
          onChange={handleSignupData}
          field="username"
          labelClasses={labelClasses}
          inputClasses={inputClasses}
        />
        <FormInput
          label="Password"
          type="password"
          value={signupData.password}
          onChange={handleSignupData}
          field="password"
          labelClasses={labelClasses}
          inputClasses={inputClasses}
        />
        <FormButton
          disabled={signupMutation.isPending}
          isPending={signupMutation.isPending}
          pendingText="Signing up..."
          text="Sign Up"
        />
        <FormLink
          text="Already have an account ? Sign in with your account"
          url={`/signin?next=${nextPage}`}
          urlText="Sign in"
        />
      </form>
    </div>
  );
};
