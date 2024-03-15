import React from "react";
import './global.css'

import { DM_Sans } from 'next/font/google'

import Header from "../components/header/header";

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
                <Header />
                {children}
            </body>
        </html>
    )
}