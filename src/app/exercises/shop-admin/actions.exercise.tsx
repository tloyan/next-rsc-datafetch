'use server'
import {
  deleteProduct as deleteProductDao,
  getProducts as getProductsDao,
  persistProduct as persistProductDao,
} from '@/db/sgbd'

import {revalidatePath} from 'next/cache'
import {Product} from '@/lib/type'
import {formSchema} from './schema'

// 🐶 Modifie le type `FormState`  de `onSubmitAction`
type FormState = {error: boolean; message: string}
// 🤖
// type ValidationError = {
//   field: keyof FormSchemaType
//   message: string
// }

// export type FormState = {
//   success: boolean
//   errors?: ValidationError[]
//   message?: string
// }

export async function onSubmitAction(
  prevState: FormState,
  data: FormData
): Promise<FormState> {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const formData = Object.fromEntries(data)
  const parsed = formSchema.safeParse(formData)
  if (!parsed.success) {
    logZodError(data)
    // 🐶 Tu vas devoir ici récupérer toutes les erreurs de `Zod`,
    // C'est à dire les champs et les messages d'erreurs

    // 🐶 Crée `validationErrors` de type `ValidationError[]`
    // 🤖 const validationErrors: ValidationError[] = ...
    // 🐶 Utilise `parsed.error.errors.map(err)` =>  pour parcourir les erreurs
    // 🐶 Utilise 🤖 `field: err.path[0] as keyof FormSchemaType` pour récupérer le champs
    // 🐶 Utilise 🤖 `message: zod server error ${err.message}` pour le message

    // 🐶 Retourne ensuite
    // 🤖
    // return {
    //   success: false,
    //   errors: validationErrors,
    //   message: 'Server Error',
    // }
    return {error: true, message: `erreur(s) de validation`}
  }
  try {
    await persistProductDao(parsed.data as Product)
    revalidatePath('/exercises/shop-admin')
    // 🐶 Retourne le bon type
    return {error: false, message: 'Success'}
  } catch (error) {
    // 🐶 Retourne le bon type
    return {error: true, message: `Server Error ${error}`}
  }
}

function logZodError(data: FormData) {
  const formData = Object.fromEntries(data)
  const parsed = formSchema.safeParse(formData)
  const errorMessages = parsed?.error?.errors
    .map((err) => `${err.path} ${err.message}`)
    .join(', ')
  console.error('Zod errorMessages', errorMessages)
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
