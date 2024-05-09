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
import {Product} from '@/db/sgbd'
import {z} from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import {useForm} from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import React from 'react'
import {CategoriesEnum} from '@/lib/type'

const formSchema = z.object({
  id: z.number(),
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
export function ProductForm({
  product,
  onSubmit,
}: {
  product?: Product
  onSubmit: (values: Product) => void
}) {
  console.log('product', product)
  const form = useForm<Product>({
    resolver: zodResolver(formSchema),
    //shouldUnregister: false,
    defaultValues: {
      id: product?.id ?? 0,
      createdAt: product?.createdAt ?? new Date().toISOString(),
      quantity: product?.quantity ?? 0,
      category: product?.category ?? CategoriesEnum.default,
      title: product?.title ?? '',
      description: product?.description ?? '',
      price: product?.price ?? 0,
    },
  })

  React.useEffect(() => {
    form.reset({
      id: product?.id ?? 0,
      createdAt: product?.createdAt ?? new Date().toISOString(),
      quantity: product?.quantity ?? 10,
      category: product?.category ?? CategoriesEnum.default,
      title: product?.title ?? '',
      description: product?.description ?? '',
      price: product?.price ?? 0,
    })
  }, [form, product]) //

  const categories = Object.keys(CategoriesEnum).filter((key) =>
    Number.isNaN(Number(key))
  )
  return (
    <Form {...form}>
      <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
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
