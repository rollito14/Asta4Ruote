import React from "react";
import EmptyFilter from "@/app/components/EmptyFilter";

const SignIn = ({
  searchParams,
}: {
  searchParams: { callbackUrl: string };
}) => {
  return (
    <EmptyFilter
      title="you need to be logged in to see that"
      subtitle="please log in to continue"
      showLogin
      callbackUrl={searchParams.callbackUrl}
    />
  );
};

export default SignIn;
