import {getProducts as getProductsDao} from '@/db/sgbd'

export const getProducts = async () => {
  const products = await getProductsDao()
  return products
}
