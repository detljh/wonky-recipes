import React from "react";
import './global.css'

import { DM_Sans } from 'next/font/google'

import Header from "../components/header/header";
import Navigation from "../components/navigation/navigation";

const dmSans = DM_Sans({
    weight: '400',
    subsets: ['latin'],
    display: 'swap'
})

export default function RootLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className={dmSans.className}>
            <body>
                <Navigation />
                <Header />
                {children}
            </body>
        </html>
    )
}