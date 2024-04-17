import {Metadata} from 'next'
import Link from 'next/link'
import {PropsWithChildren} from 'react'

import {ModeToggle} from '@/components/theme-toggle'

export const metadata: Metadata = {
  title: 'App',
  description: "Page d'app",
}

export default function AppLayout({children}: PropsWithChildren) {
  const generateDate = new Date().toISOString()
  return (
    <div className="flex h-screen flex-col">
      <header className="border-b">
        <div className="container px-4 sm:px-6 lg:px-8">
          <nav className="flex h-14 items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                className="flex items-center space-x-2 font-bold"
                href="/final"
              >
                <span>Home</span>
              </Link>
              <div className="hidden items-center space-x-2 md:flex">
                <Link
                  className="font-medium transition-colors hover:underline"
                  href="/final/dashboard"
                >
                  Dashboard
                </Link>
                <Link
                  className="font-medium transition-colors hover:underline"
                  href="/final/cgv"
                >
                  CGV
                </Link>
                <Link
                  className="font-medium transition-colors hover:underline"
                  href="/final/todos"
                >
                  Todos
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Link
                className="text-sm font-semibold underline sm:hidden"
                href="/final/dashboard"
              >
                Dashboard
              </Link>
              <Link
                className="text-sm font-semibold underline sm:hidden"
                href="/final/cgv"
              >
                CGV
              </Link>
              <Link
                className="flex items-center space-x-2 font-medium"
                href="/final/cgv"
              >
                <span>Profile</span>
              </Link>
              <ModeToggle />
            </div>
          </nav>
        </div>
      </header>
      <main className="grid flex-1">
        <div className="grid h-full items-center justify-center p-4 text-center">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Welcome to the App
            </h1>
            {children}
          </div>
        </div>
      </main>
      <footer className="border-t">
        <div className="container flex h-14 items-center justify-center px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            © {new Date().getFullYear()} Super SaaS . All rights reserved.{' '}
            <p className="text-sm">Rendu le {generateDate}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
