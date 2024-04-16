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
            <Link href="/final/bo">BackOffice</Link>
          </li>
          <li>
            <Link href="/final/bo/reports">BackOffice - Report</Link>
          </li>
        </ul>
      </nav>
    </>
  )
}
