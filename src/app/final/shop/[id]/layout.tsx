import React from 'react'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {fetchProduct, getProductById} from '../actions'

export default async function Layout({
  params,
  children,
}: {
  params: {id: string}
  children: React.ReactNode
}) {
  //const product = await getProductById(Number(params.id))
  const product = await fetchProduct(params.id)
  return (
    <>
      <div className="border p-4">
        <h3>layout du produit {product?.id}</h3>
      </div>
      <div className="p-4">{children}</div>
    </>
  )
}
