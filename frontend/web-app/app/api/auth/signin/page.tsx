import React from "react";
import EmptyFilter from "@/app/components/EmptyFilter";

const SignIn = async ({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl: string }>;
}) => { 
  const {callbackUrl} = await searchParams;
  return (
    <EmptyFilter
      title="you need to be logged in to see that"
      subtitle="please log in to continue"
      showLogin
      callbackUrl= {callbackUrl}
    />
  );
};

export default SignIn;
