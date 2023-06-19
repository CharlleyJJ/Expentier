import './globals.css'
import { Inter } from 'next/font/google'
import Nav from '@/components/navigation'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Expentier',
  description: 'Your Next Expenses Manager',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Nav/>
        {children}
        </body>
    </html>
  )
}
