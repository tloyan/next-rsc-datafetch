import {Metadata} from 'next'
import Link from 'next/link'

import {PropsWithChildren} from 'react'

export const metadata: Metadata = {
  title: 'App',
  description: "Page d'app",
}
export default function BackofficeLayout({children}: PropsWithChildren) {
  const generateDate = new Date().toISOString()

  return (
    <div className="flex h-screen flex-col bg-gradient-to-r from-gray-900 to-gray-800 text-gray-200">
      <header className="bg-gradient-to-r from-black to-gray-800 p-4 shadow-lg">
        <h1 className="text-xl font-bold">Backoffice Title</h1>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="from-dark-900 w-64 space-y-2 bg-gradient-to-b via-gray-800 to-gray-900 p-4">
          <nav className="flex flex-col">
            <Link
              href="/final"
              className="block rounded px-4 py-2 transition-colors hover:bg-gray-700"
            >
              Home
            </Link>
            <Link
              href="/final/bo"
              className="block rounded px-4 py-2 transition-colors hover:bg-gray-700"
            >
              Backoffice
            </Link>
            <Link
              href="/final/bo/reports"
              className="block rounded px-4 py-2 transition-colors hover:bg-gray-700"
            >
              Reports
            </Link>
            <Link
              href="/final/parallel"
              className="block rounded px-4 py-2 transition-colors hover:bg-gray-700"
            >
              Parrellel
            </Link>
            <Link
              href="/final/intercept"
              className="block rounded px-4 py-2 transition-colors hover:bg-gray-700"
            >
              Intercept CGV
            </Link>
          </nav>
        </aside>

        <main className="flex-1 overflow-auto bg-gradient-to-r from-black to-gray-800 p-4">
          {children}
        </main>
      </div>

      <footer className="bg-gradient-to-r from-black to-gray-800 p-4 shadow-inner">
        <p>
          © {new Date().getFullYear()} Super SaaS Backoffice. All rights
          reserved.
        </p>
        <p className="text-sm">Rendu le {generateDate}</p>
      </footer>
    </div>
  )
}
