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

import {useRef} from 'react'
import {CategoriesEnum, Product} from '@/lib/type'
// 🐶 Importe `onSubmitAction` notre action server
//import {onSubmitAction} from '../actions'

// 🐶 Importe `useActionState` notre `hook custom`
//import {useFormState as useActionState} from 'react-dom' //todo migrate React 19
import {Label} from '@/components/ui/label'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function ProductForm({product}: {product?: Product}) {
  // 🐶 Utilise le hook `useActionState` pour gérer l'état de notre formulaire
  // const [state, formAction] = useActionState
  // 🐶 Passe `onSubmitAction` en premier argument et
  // {error: false, message: ''} en deuxième argument le state initial

  const formRef = useRef<HTMLFormElement>(null)

  // 🐶 Utilise `React.useEffect` pour afficher un message en fonction de l'état de notre formulaire et reset le `form`
  // 🤖 toast.error(state.message) ou toast.success(state.message)
  // 🤖 handleReset() pour réinitialiser le formulaire

  // const handleReset = () => {
  //   if (formRef.current) {
  //     formRef.current.reset()
  //   }
  // }
  const categories = Object.keys(CategoriesEnum).filter((key) =>
    Number.isNaN(Number(key))
  )

  return (
    // 🐶 Ajoute le prop `action={formAction}`
    <form ref={formRef} className="gap-2 space-y-4">
      <Label>Product title</Label>
      <Input placeholder="ex : Iphone" name="title" />
      <Label>Product title</Label>
      <Input type="number" placeholder="199" name="price" />
      <Label>Product title</Label>
      <Textarea placeholder="Product description" name="description" />
      <Label>Product title</Label>
      <Select name="category">
        <SelectTrigger>
          <SelectValue placeholder="Choisir une catégorie" />
        </SelectTrigger>

        <SelectContent>
          {categories.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Label>Product title</Label>
      <Input type="number" placeholder="Product quantity" name="quantity" />
      <div className="flex gap-2">
        <Button size="sm" type="submit">
          Save
        </Button>
        <Button size="sm" variant="outline">
          Cancel
        </Button>
      </div>
    </form>
  )
}
