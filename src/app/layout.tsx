import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import ClientProvider from "@/providers/ClientProvider";
import { ToastProvider } from "@/providers/ToastProvider";
export const metadata: Metadata = {
  title: "Eventure",
  description: "Eventure",
  icons: {
    icon: "/images/eventure-logo.ico",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en">
      <SessionProvider refetchInterval={120} session={session}>
        <ClientProvider>
          <body className={`antialiased bg-ghost-white`}>
            <ToastProvider>
              <div className="mx-auto">
                <Header />
                <div className="max-lg:mx-2">{children}</div>
                <Footer />
              </div>
            </ToastProvider>
          </body>
        </ClientProvider>
      </SessionProvider>
    </html>
  );
}
