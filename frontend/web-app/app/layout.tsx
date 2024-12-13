import "./globals.css";
import Navbar from "@/app/nav/Navbar";
import React from "react";
import ToasterProvider from "@/app/providers/ToasterProvider";
import SignalRProvider from "@/app/providers/SignalR_Provider";
import { getCurrentUser } from "@/app/actions/authActions";

export const metadata = {
  title: "Asta4Route",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();
  return (
    <html lang="en">
      <body>
        <ToasterProvider />
        <Navbar />
        <main className={"container mx-auto px-5 pt-10"}>
          <SignalRProvider user={user}>{children}</SignalRProvider>
        </main>
      </body>
    </html>
  );
}
