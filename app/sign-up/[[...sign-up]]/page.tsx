import { SignUp } from '@clerk/nextjs';

const SignUpPage = () => {
  return (
    <div className='flex flex-col items-center justify-center'>
      <h1>Sign Up</h1>
      <SignUp forceRedirectUrl={"/dashboard"} />
    </div>
  );
};

export default SignUpPage;