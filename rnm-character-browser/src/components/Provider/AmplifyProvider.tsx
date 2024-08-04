"use client";

import { Authenticator } from "@aws-amplify/ui-react";

export default function AmplifyProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Authenticator.Provider>{children}</Authenticator.Provider>;
}
