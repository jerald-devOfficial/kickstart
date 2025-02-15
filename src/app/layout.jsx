import localFont from "next/font/local";
import "./globals.css";
import PropTypes from "prop-types";
import Header from "@/components/Header";
import AppProviders from "./providers";
import { Fragment } from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "KickStart",
  description: "KickStart your campaign with blockchains",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen gap-y-5 container mx-auto py-4`}
      >
        <AppProviders>
          <Fragment>
            <Header />
            {children}
          </Fragment>
        </AppProviders>
      </body>
    </html>
  );
};

export default RootLayout;

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
