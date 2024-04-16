import Link from 'next/link'

export default function Page() {
  return (
    <>
      <h1 className="p-4 text-2xl">Solution</h1>

      <nav className="m-4">
        <ul>
          <li>
            <Link href="/">
              Racine <code>/</code>
            </Link>
          </li>
          <li>___</li>
          <li>
            <Link href="/final/dashboard">App - Dashboard</Link>
          </li>
          <li>
            <Link href="/final/cgv">App - Cgv</Link>
          </li>
          <li>___</li>
          <li>
            <Link href="http://localhost:4000/posts">External API</Link>
          </li>
          <li>
            <Link href="/final/api/posts">API Next</Link>
          </li>
        </ul>
      </nav>
    </>
  )
}
