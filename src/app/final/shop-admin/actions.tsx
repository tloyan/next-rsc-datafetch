'use server'
import {
  Product,
  addProduct as addProductDao,
  getProducts as getProductsDao,
  updateProduct as updateProductDao,
} from '@/db/sgbd'

export const getProducts = async () => {
  const products = await getProductsDao()
  return products
}

export const addProduct = async (product: Product) => {
  const products = await addProductDao(product)
  return products
}

export const updatedProduct = async (product: Product) => {
  const products = await updateProductDao(product)
  return products
}
