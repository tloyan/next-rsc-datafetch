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
import {formSchema} from '../schema'
import {useFormState, useFormStatus} from 'react-dom'
import {onSubmitProductAction} from '../actions'

import {toast} from 'sonner'
//import {X} from 'lucide-react'

export default function ProductForm({
  product,
  // onSubmit,
}: {
  product?: Product
  onSubmit?: (values: Product) => void
}) {
  const [state, formAction] = useFormState(onSubmitProductAction, {
    success: true,
  })
  const [showMessage, setShowMessage] = React.useState(true)

  const form = useForm<Product>({
    resolver: zodResolver(formSchema),
    //shouldUnregister: false,
    defaultValues: {
      id: product?.id ?? '',
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
      id: product?.id ?? '',
      createdAt: product?.createdAt ?? new Date().toISOString(),
      quantity: product?.quantity ?? 10,
      category: product?.category ?? undefined,
      title: product?.title ?? '',
      description: product?.description ?? '',
      price: product?.price ?? 0,
    })
    setShowMessage(false)
  }, [form, product]) //

  React.useEffect(() => {
    setShowMessage(true)
  }, [state])

  React.useEffect(() => {
    if (state?.success) {
      toast.success('Product saved')
      form.reset({
        id: '',
        createdAt: new Date().toISOString(),
        quantity: 10,
        category: undefined,
        title: '',
        description: '',
        price: 0,
      })
    } else {
      //set rhf errors form the server errors
      for (const error of state?.errors ?? []) {
        form.setError(error.field, {type: 'manual', message: error.message})
      }

      toast.error(state.message ?? 'Error')
    }
  }, [form, state, state?.success])

  const categories = Object.keys(CategoriesEnum).filter((key) =>
    Number.isNaN(Number(key))
  )

  const handleSubmitAction = (prod: Product) => {
    const formData = new FormData()
    for (const [key, value] of Object.entries(prod)) {
      formData.append(key, value as string | Blob)
    }
    formAction(formData)
  }

  return (
    <Form {...form}>
      {showMessage && (
        <>
          {!state?.success && (
            <div className="text-red-500">Erreur : {state.message}</div>
          )}
          {/* {state?.errors && (
            <div className="text-red-500">
              <ul>
                {state.errors.map((err) => (
                  <li key={err.field} className="flex gap-1">
                    <X fill="red" />
                    {err.field} {err.message}
                  </li>
                ))}
              </ul>
            </div>
          )} */}
        </>
      )}
      <form
        className="grid gap-4"
        action={formAction}
        onSubmit={form.handleSubmit(handleSubmitAction)}
      >
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
                name="category"
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
          <ButtonComponent />
        </div>
      </form>
    </Form>
  )
}

const ButtonComponent = () => {
  const status = useFormStatus()
  //constate que status ne fonctionne pas
  console.log('status', status)
  return (
    <>
      <Button size="sm" type="submit" disabled={status.pending}>
        Save
      </Button>
      <Button size="sm" variant="outline">
        Cancel
      </Button>
    </>
  )
}
