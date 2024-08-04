"use client";
import { Authenticator } from "@aws-amplify/ui-react";

const SignIn = () => {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <div>
          <h1>Hello {user?.username}</h1>
          <button onClick={signOut}>Sign Out</button>
        </div>
      )}
    </Authenticator>
  );
};

export default SignIn;
