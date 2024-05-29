'use server'
import {
  deleteProduct as deleteProductDao,
  getProducts as getProductsDao,
  persistProduct as persistProductDao,
} from '@/db/sgbd'

import {revalidatePath} from 'next/cache'
import {Product} from '@/lib/type'
import {formSchemaLight} from './schema'

export type FormStateSimple = {error: boolean; message: string}

export async function onSubmitAction(
  prevState: FormStateSimple,
  data: FormData
): Promise<FormStateSimple> {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const formData = Object.fromEntries(data)
  const parsed = formSchemaLight.safeParse(formData)
  if (!parsed.success) {
    const errorMessages = parsed.error.errors
      .map((err) => err.message)
      .join(', ')
    return {error: true, message: `erreur(s) de validation : ${errorMessages}`}
  }
  try {
    await persistProductDao(parsed.data as Product)
    return {error: false, message: 'Success'}
  } catch (error) {
    return {error: true, message: `Server Error ${error}`}
  }
}

export const getProducts = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const products = await getProductsDao()
  return products
}

export const persistProduct = async (product: Product) => {
  await persistProductDao(product)
  revalidatePath('/exercises/shop-admin')
}

export const deleteProduct = async (product: Product) => {
  await deleteProductDao(product.id)
  revalidatePath('/exercises/shop-admin')
}
