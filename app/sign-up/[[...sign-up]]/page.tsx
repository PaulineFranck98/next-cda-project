'use client';

import { SignUp } from "@clerk/nextjs";
// import { useUser } from "@clerk/nextjs";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

// export default function SignUpPage() {
//   const { isSignedIn } = useUser();
//   const router = useRouter();

//   useEffect(() => {
//     if (isSignedIn) {
//       console.log("User is signed in");
//       router.push("/dashboard");
//     } else {
//       console.log("User is not signed in");}
//   }, [isSignedIn, router]);

//   return <SignUp />;
// }

const SignUpPage = () => {
  return (
    <div className='flex flex-col items-center justify-center'>
      <h1>Sign Up</h1>
      <SignUp forceRedirectUrl={"/dashboard"}/>
    </div>
  );
};

export default SignUpPage;