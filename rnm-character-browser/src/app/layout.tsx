import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ApolloProvider from "../components/ApolloProvider";

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
      <body className={inter.className}>
        <ApolloProvider>{children}</ApolloProvider>
      </body>
    </html>
  );
}
