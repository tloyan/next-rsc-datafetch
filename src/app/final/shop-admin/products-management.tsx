/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/OCO4EXvSy54
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

/** Add fonts into your Next.js project:

import { Inter } from 'next/font/google'

inter({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
'use client'
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from '@/components/ui/table'
import {Button} from '@/components/ui/button'
import {ChevronsUpDown, Plus, X} from 'lucide-react'
import {CardTitle, CardHeader, CardContent, Card} from '@/components/ui/card'
import {Input} from '@/components/ui/input'
import {Textarea} from '@/components/ui/textarea'
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from '@/components/ui/select'
import {JSX, SVGProps, useState} from 'react'
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'

const formSchema = z.object({
  title: z.string().min(2, {
    message: 'Title must be at least 2 characters.',
  }),
})
export function ProductsManagement({products}: {products: Product[]}) {
  const [isCollapsibleOpen, setIsCollapsibleOpen] = useState(false)
  const form = useForm<Product>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      createdAt: new Date().toISOString(),
      quantity: 0,
      category: 'revenus',
      title: '',
      description: '',
      price: 0,
    },
  })

  const setFormValues = (data: Product) => {
    for (const key of Object.keys(data)) {
      form.setValue(key as keyof Product, data[key as keyof Product])
    }
  }

  async function onSubmit(values: Product) {
    console.log(values)
  }
  return (
    <div className="flex flex-col ">
      <Collapsible open={isCollapsibleOpen} onOpenChange={setIsCollapsibleOpen}>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="w-9 p-0">
            <ChevronsUpDown className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="mb-4 rounded-lg border shadow-sm">
            <Card>
              <CardHeader>
                <CardTitle>Product</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    className="grid gap-4"
                    onSubmit={form.handleSubmit(onSubmit)}
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
                            <Input placeholder="Product price" {...field} />
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
                            <Textarea
                              placeholder="Product description"
                              {...field}
                            />
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
                          >
                            <FormLabel>Catégorie</FormLabel>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Choisir une catégorie" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="lighting">Lighting</SelectItem>
                              <SelectItem value="furniture">
                                Furniture
                              </SelectItem>
                              <SelectItem value="bags">Bags</SelectItem>
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
                            <Input placeholder="Product quantity" {...field} />
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
              </CardContent>
              <div className="mb-4 ml-4 flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => form.reset()}
                >
                  <AddIcon className="mr-2 h-4 w-4" />
                  New Product
                </Button>
              </div>
            </Card>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <div className="rounded-lg border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.title}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => {
                      setFormValues(product)
                      setIsCollapsibleOpen(true)
                    }}
                  >
                    <PencilIcon className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button className="ml-2" size="icon" variant="outline">
                    <TrashIcon className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

function AddIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="16" />
      <line x1="8" y1="12" x2="16" y2="12" />
    </svg>
  )
}

function PencilIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
      <path d="m15 5 4 4" />
    </svg>
  )
}

function TrashIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  )
}
