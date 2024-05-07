'use server'
import {
  Product,
  addProduct as addProductDao,
  deleteProduct as deleteProductDao,
  getProducts as getProductsDao,
  updateProduct as updateProductDao,
} from '@/db/sgbd'

import {revalidatePath} from 'next/cache'

export const getProducts = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const products = await getProductsDao()
  return products
}

export const addProduct = async (product: Product) => {
  const products = await addProductDao(product)
  return products
}

export const updatedProduct = async (product: Product) => {
  await updateProductDao(product)
  revalidatePath('/final/shop-admin')
  //return products
}
export const deleteProduct = async (product: Product) => {
  await deleteProductDao(product.id)
  revalidatePath('/final/shop-admin')
}
