import { SignIn } from '@clerk/nextjs';

const SignInPage = () => {
  return (
    <div className='flex flex-col items-center justify-center '>
      <h1>Sign In</h1>
      <SignIn />
    </div>
  );
};

export default SignInPage;