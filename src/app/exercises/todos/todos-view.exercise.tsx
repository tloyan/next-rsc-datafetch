'use client'
import {Input} from '@/components/ui/input'
import {Button} from '@/components/ui/button'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {addTodo as addTodoDao} from '@/db/sgbd'
import TodoItem from './todo-item'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {toast} from 'sonner'
import {AddTodo, Todo} from '@/lib/type'
import React from 'react'

//🐶
async function addTodo(todo: AddTodo) {
  console.log('add todo action', todo)
  // 🐶 Dans un premier temps essaye d'appeler `addTodoDao`
  // 🤖 await addTodoDao(todo)

  // 🐶 Tu devrais voir apparaître une erreur de compilation car c'est du code serveur et il
  // n'est pas possible de l'appeler depuis le client
  // 🐶 Ajoute la directive `use server` pour indiquer que c'est du code serveur.
  // 🤖 'use server'

  // 🐶 Tu devrais toujours constater le problème car nous sommes dans un composant client
  // La solution est de créer l'action dans un fichier à part et de l'importer ici

  // 🐶 Pour la suite de l'exercice s'effectuera dans `actions.tsx` où nous allons créer la fonction `addTodo` et l'importer ici

  // 🤖 addTodoAction(todo)
  // import {addTodo as AddTodoAction} from './actions'
  // Pour bien reconnaître l'action, on peut la renommer 'AddTodoAction' mais cela est facultatif
}
interface TodosProps {
  todos: Todo[]
}
export default function Todos({todos}: TodosProps) {
  const [inputValue, setInputValue] = React.useState('')

  const handleClick = async () => {
    await addTodo({
      title: inputValue,
      isCompleted: false,
      updadtedAt: new Date().toISOString(),
    })
    // 🐶 Affiche un `toast` avec `Sonner`
    // 🤖 toast('Todo has been created.')
  }

  return (
    <div className="flex  flex-col text-left">
      <div className="flex h-14 items-center border-b p-4 ">
        <h1 className="text-lg font-bold">Todos</h1>
      </div>
      <div className="flex flex-1 flex-col justify-start gap-4 p-4">
        <div className="flex gap-2">
          <Input
            className="flex-1"
            placeholder="New todo"
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Button onClick={handleClick}>Submit</Button>
        </div>
        <div className="grid gap-4">
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </div>
      </div>
    </div>
  )
}
