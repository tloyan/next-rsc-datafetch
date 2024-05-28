'use client'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {Textarea} from '@/components/ui/textarea'
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from '@/components/ui/select'

//import {zodResolver} from '@hookform/resolvers/zod'
import {useForm} from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import {CategoriesEnum, Product} from '@/lib/type'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {persistProduct as persistProductAction} from '../actions'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {toast} from 'sonner'
import z from 'zod'

// 🐶 Créé un shéma zod definissant les champs du formulaire
export const formSchema = z.object({
  // id: // 🐶 string,
  // createdAt: // 🐶 string
  // quantity: // 🐶 force la convertion en number avec coerce
  // category: // 🐶 string
  // price: // 🐶 force la convertion en number avec coerce
  // 🐶  defini title en string min 2 avec un message d'erreur custom
  // 🤖
  // title: z.string().min(2, {
  //   message: 'Title must be at least 2 characters.',
  // }),
  // description: z.string().min(2, {
  //   message: 'Description must be at least 2 characters.',
  // }),
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function ProductForm({product}: {product?: Product}) {
  const form = useForm<Product>({
    // 🐶 Applique le ZodResolver
    // resolver: zodResolver(formSchema),
    // 🐶 defini les valeurs par default de Product
    // defaultValues: {
    //   id: product?.id ?? '',
    //   createdAt: product?.createdAt ?? new Date().toISOString(),
    //   quantity: product?.quantity ?? 0,
    //   category: product?.category ?? CategoriesEnum.default,
    //   title: product?.title ?? '',
    //   description: product?.description ?? '',
    //   price: product?.price ?? 0,
    // },
  })

  // 🐶 utilise 'useEffect' pour mettre en jour product en cas de nouveau prop product
  // React.useEffect(() => {
  //   form.reset({
  //     id: product?.id ?? '',
  //     createdAt: product?.createdAt ?? new Date().toISOString(),
  //     quantity: product?.quantity ?? 10,
  //     category: product?.category ?? undefined,
  //     title: product?.title ?? '',
  //     description: product?.description ?? '',
  //     price: product?.price ?? 0,
  //   })
  // }, [form, product]) //

  const categories = Object.keys(CategoriesEnum).filter((key) =>
    Number.isNaN(Number(key))
  )

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async function onSubmit(values: Product) {
    // 🐶 Appelle 'persistProductAction' le server action qui ADD/UPDATE un produit
    // const isUpdate = values.id ? true : false
    // persistProductAction(values)
    // toast(isUpdate ? 'Product updated' : 'Product added')
  }
  return (
    // 🐶 Utilise le composant Form pour englober le formulaire
    // 🐶 Form, FormField, FormItem, FormControl, FormMessage sont des composants ShadCn pret à etre utiliser avec React Hook Form
    // 📑 https://ui.shadcn.com/docs/components/form
    <Form {...form}>
      {/*  🐶 Ajoute la soumission du form 
           🤖 onSubmit={form.handleSubmit(onSubmit)} */}
      <form className="grid gap-4">
        <FormField
          control={form.control}
          name="title"
          render={({field}) => (
            <FormItem>
              <FormLabel>Product title</FormLabel>
              <FormControl>
                <Input placeholder="ex : Iphone" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({field}) => (
            <FormItem>
              <FormLabel>Product price</FormLabel>
              <FormControl>
                <Input type="number" placeholder="199" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({field}) => (
            <FormItem>
              <FormLabel>Product description</FormLabel>
              <FormControl>
                <Textarea placeholder="Product description" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({field}) => (
            <FormItem>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                value={field.value}
              >
                <FormLabel>Catégorie</FormLabel>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir une catégorie" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="quantity"
          render={({field}) => (
            <FormItem>
              <FormLabel>Product quantity</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Product quantity"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-2">
          <Button size="sm" type="submit">
            Save
          </Button>
          <Button size="sm" variant="outline">
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  )
}
