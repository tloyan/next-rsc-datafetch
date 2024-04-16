// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, {Suspense} from 'react'

export default async function Layout({
  children,
  editor,
  admin,
}: {
  children: React.ReactNode
  editor: React.ReactNode
  admin: React.ReactNode
}) {
  const role = Math.random() > 0.5 ? 'admin' : 'editor'

  return (
    <>
      <h2>Gestion Admin / Editor Layout</h2>
      <div className="m-6 flex flex-col">
        {children}
        {editor}
        {role === 'admin' ? admin : undefined}
        {/* <Suspense fallback={<div>Loading...</div>}>
          {role === 'admin' ? admin : undefined}
        </Suspense> */}
      </div>
    </>
  )
}
