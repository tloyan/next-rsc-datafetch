import {Metadata} from 'next'
import Link from 'next/link'
import {PropsWithChildren} from 'react'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'App',
  description: "Page d'app",
}
export default function AppLayout({children}: PropsWithChildren) {
  const generateDate = new Date().toISOString()
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <nav className="bg-gradient-to-r from-black via-black to-red-900">
        <div className="mx-auto flex max-w-4xl items-center justify-between p-4">
          <ul className="flex space-x-4">
            <li>
              <Link href="/final" className="hover:text-gray-300">
                Accueil
              </Link>
            </li>
            <li>
              <Link href="/final/dashboard" className="hover:text-gray-300">
                DashBoard
              </Link>
            </li>
            <li>
              <Link href="/final/cgv" className="hover:text-gray-300">
                CGV
              </Link>
            </li>
          </ul>

          <div>
            <Link href="/settings" className="hover:text-gray-300">
              {/* Placeholder pour l'icône ou autre élément ici */}
              <Image
                src="/app_icon.png"
                alt="Vercel Logo"
                className=""
                width={40}
                height={24}
                priority
              />
            </Link>
          </div>
        </div>
      </nav>
      <main className="mx-auto max-w-4xl flex-1 p-4">{children}</main>

      <footer className="bg-gradient-to-r from-black via-black to-indigo-900 p-4 text-center">
        <div className="mx-auto max-w-4xl">
          © {new Date().getFullYear()} Super SaaS . All rights reserved.{' '}
          <p className="text-sm">Rendu le {generateDate}</p>
        </div>
      </footer>
    </div>
  )
}
