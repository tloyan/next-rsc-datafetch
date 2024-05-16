'use server'
import {
  getProductById as getProductByIdDao,
  getProducts as getProductsDao,
} from '@/db/sgbd'

import {cache} from 'react'

export const getProducts = async () => {
  const products = await getProductsDao()
  return products
}

export const getProductById = cache(async (id: string) => {
  const products = await getProductByIdDao(id)
  return products
})

// export const getProductById = async (id: number) => {
//   const products = await getProductByIdDao(id)
//   return products
// }
export async function fetchProduct(id: string) {
  console.log('fetching product', id)
  const res = await fetch(`http://localhost:4000/products/${id}`)

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}
