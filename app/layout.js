"use client"

import './globals.css'
import { Inter } from '@next/font/google'
import Nav from '@/components/navigation'
import FinanceContextProvider from '@/lib/store/finance-context'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Expentier',
  description: 'Your Next Expenses Manager',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <FinanceContextProvider>
            <Nav/>
            {children}
          </FinanceContextProvider>
          
        </body>
    </html>
  )
}
