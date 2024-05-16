'use client'
import {Button} from '@/components/ui/button'
import {ChevronsUpDown} from 'lucide-react'
import {CardTitle, CardHeader, CardContent, Card} from '@/components/ui/card'
import {toast} from 'sonner'
import {JSX, SVGProps, useState} from 'react'
import {Product} from '@/db/sgbd'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'

//import {ProductForm} from './product-form'
//import {ProductForm} from './product-form-useformstate'
import ProductForm from './form'
import {ProductsTable} from './product-table'
import {deleteProduct, persistProduct} from './actions'

export function ProductsManagement({products}: {products: Product[]}) {
  const [isCollapsibleOpen, setIsCollapsibleOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>()

  const handleSelectedProduct = (product: Product) => {
    setSelectedProduct(product)
    setIsCollapsibleOpen(true)
  }
  const handleDeleteProduct = async (product: Product) => {
    console.log('delete', product)
    await deleteProduct(product)
    toast('Product deleted')
    setSelectedProduct(undefined)
  }
  async function onSubmit(values: Product) {
    console.log('submit', values)
    const isUpdate = values.id ? true : false
    persistProduct(values)
    // const data = await (values.id ? updateProduct(values) : addProduct(values))
    //console.log('data', data)
    toast(isUpdate ? 'Product updated' : 'Product added')
    setSelectedProduct(undefined)
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
                <ProductForm product={selectedProduct} onSubmit={onSubmit} />
              </CardContent>
              <div className="mb-4 ml-4 flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setSelectedProduct({title: 'NEW'} as Product)}
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
        <ProductsTable
          products={products}
          onSelectedChange={handleSelectedProduct}
          onDeleteProduct={handleDeleteProduct}
        />
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
