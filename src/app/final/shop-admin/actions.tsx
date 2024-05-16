'use server'
import {
  Product,
  addProduct as addProductDao,
  deleteProduct as deleteProductDao,
  getProducts as getProductsDao,
  updateProduct as updateProductDao,
  persistProduct as persistProductDao,
} from '@/db/sgbd'
import {FormSchemaType, formSchema, formSchemaLight} from './schema'
import {revalidatePath} from 'next/cache'

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
type ValidationError = {
  field: keyof FormSchemaType
  message: string
}

export type FormState = {
  success: boolean
  errors?: ValidationError[]
  message?: string
}
export async function onSubmitProductAction(
  prevState: FormState,
  data: FormData
): Promise<FormState> {
  const formData = Object.fromEntries(data)
  const parsed = formSchema.safeParse(formData)

  if (!parsed.success) {
    const validationErrors: ValidationError[] = parsed.error.errors.map(
      (err) => ({
        field: err.path[0] as keyof FormSchemaType,
        message: `zod server error ${err.message}`,
      })
    )
    return {
      success: false,
      errors: validationErrors,
      message: 'Server Error',
    }
  }
  if (data.get('title')?.toString().includes('a')) {
    return {
      success: false,
      errors: [
        {
          field: 'title',
          message: 'Custom server error : Title must not contain the letter a',
        },
      ],
      message: 'Server Error',
    }
  }

  try {
    await persistProductDao(parsed.data as Product)
    revalidatePath('/final/shop-admin')
    return {
      success: true,
      message: 'Product Saved',
    }
  } catch (error) {
    return {
      success: false,
      message: `Unkown Server Error ${error}`,
    }
  }
}
export const getProducts = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const products = await getProductsDao()
  return products
}

export const addProduct = async (product: Product) => {
  await addProductDao(product)
  return {ok: true, product}
}

export const updateProduct = async (product: Product) => {
  await updateProductDao(product)
  revalidatePath('/final/shop-admin')
  return {ok: true, product}
  //return products
}
export const deleteProduct = async (product: Product) => {
  await deleteProductDao(product.id)
  revalidatePath('/final/shop-admin')
}

export const persistProduct = async (product: Product) => {
  await persistProductDao(product)
  revalidatePath('/final/shop-admin')
  return {ok: true, product}
}
