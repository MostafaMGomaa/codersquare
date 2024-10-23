import { FormEvent, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';

import { FormButton, FormInput } from '../../components';
import { useLoginMutation } from '../../api/auth';
import { LoginPayload } from '../../types';
import { FormLink } from '../../components/common/form-link';

export const LoginForm = () => {
  const [loginData, setLoginData] = useState<LoginPayload>({
    email: '',
    password: '',
  });

  const [searchParams] = useSearchParams();

  const loginMutation = useLoginMutation();
  const navigate = useNavigate();

  const nextPage = searchParams.get('next') || '/';

  const inputClasses = `border border-gray-500 
          group-hover:border-orange-700 rounded bg-transparent h-9 w-[20rem] transition-colors duration-300 
          p-2 outline-none shadow-none focus:ring-0 focus:ring-transparent group-focus-within:border-orange-700`;
  const labelClasses = `relative font-semibold w-40 group-hover:text-orange-700 text-gray-500 group-focus-within:text-orange-700`;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await loginMutation.mutateAsync(loginData);
      toast.success('Successfully Sign in!');
      setTimeout(() => {
        navigate(nextPage);
      }, 10 * 100);
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Sign up failed';
      toast.error(error || 'Sign up failed', {
        position: 'bottom-center',
      });
    }
  };
  const handleLoginData = (inputType: string, value: string): void => {
    setLoginData((values: LoginPayload) => ({ ...values, [inputType]: value }));
  };

  return (
    <div className="m-10 ml-18 mt-18">
      <form className="flex flex-col gap-10" onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          field="email"
          value={loginData.email}
          onChange={handleLoginData}
          parentDivClasses="email"
          inputClasses={inputClasses}
          labelClasses={labelClasses}
        />
        <FormInput
          label="Password"
          type="password"
          value={loginData.password}
          onChange={handleLoginData}
          field="password"
          labelClasses={labelClasses}
          inputClasses={inputClasses}
        />
        <FormButton
          disabled={loginMutation.isPending}
          isPending={loginMutation.isPending}
          pendingText="Signing in..."
          text="Sign In"
        />
        <FormLink
          text="Doesn't have an account ? Sign up to start"
          url={`/signup?next=${nextPage}`}
          urlText="Sign up"
        />
      </form>
    </div>
  );
};
