import './globals.css';
import './CardsStyles.css';
import { Inter } from 'next/font/google'
import Providers from "@/app/providers";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import HeadNavBar from "@/components/HeadNavBar";
import Footer from "@/components/Footer";
import React from "react";


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <html lang="en">
      <Providers>
        {/*<ReactQueryDevtools />*/}
        <body className={inter.className}>
        <HeadNavBar />
          {children}
        <Footer />
        </body>
      </Providers>
      </html>
  )
}
