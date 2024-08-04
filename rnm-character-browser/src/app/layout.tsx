import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ApolloProvider from "../components/Provider/ApolloProvider";
import AmplifyProvider from "../components/Provider/AmplifyProvider";
import ConfigureAmplifyClientSide from "../components/Provider/ConfigureAmplifyClientSide";
import Navbar from "../components/Navbar";
import "@aws-amplify/ui-react/styles.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dennis Demo",
  description: "Rick and Morty Character Browser",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <ApolloProvider>
          <ConfigureAmplifyClientSide />
          <AmplifyProvider>
            <Navbar />
            {children}
          </AmplifyProvider>
        </ApolloProvider>
      </body>
    </html>
  );
}
