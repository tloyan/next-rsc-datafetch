import z from 'zod'

export const formSchema = z.object({
  id: z.union([z.number(), z.string()]),
  createdAt: z.string(),
  quantity: z.coerce.number(),
  category: z.string(),
  price: z.coerce.number(),
  title: z.string().min(2, {
    message: 'Title must be at least 2 characters.',
  }),
  description: z.string().min(2, {
    message: 'Description must be at least 2 characters.',
  }),
})
export type FormSchemaType = z.infer<typeof formSchema>
//export const formSchemaCreate = formSchema.omit({id: true})
export const formSchemaLight = formSchema.partial({
  id: true,
  createdAt: true,
})
