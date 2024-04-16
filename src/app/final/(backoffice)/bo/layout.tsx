'use client'
import React, {useEffect, useState} from 'react'

export default function Template({children}: {children: React.ReactNode}) {
  const [support, setSupport] = useState('')
  useEffect(() => {
    console.log('Template/Layout mounted')
  }, [])
  return (
    <>
      <div className="flex  flex-col gap-2">
        <label htmlFor="support">Contacter le support</label>
        <input
          className="w-60 text-black"
          id="support"
          value={support}
          onChange={(e) => setSupport(e.target.value)}
        />
      </div>
      <div>{children}</div>
    </>
  )
}
