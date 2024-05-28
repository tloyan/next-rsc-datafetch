'use client'
import {Input} from '@/components/ui/input'
import {Button} from '@/components/ui/button'

import TodoItem from './todo-item'
import {toast} from 'sonner'
import {Todo} from '@/lib/type'
// 🐶 Importe le hook useOptimistic
import React from 'react'
import {addTodo as AddTodoAction} from './actions'

interface TodosProps {
  todos: Todo[]
}

export default function Todos({todos}: TodosProps) {
  const [inputValue, setInputValue] = React.useState('')

  // 🐶 Utilise le Hook 'useOptimistic' pour avoir
  // 🤖 const [optimisticTodos, addOptimisticTodo] = ...

  // 🐶 Le 1er paramètre de 'useOptimistic' est la liste de 'todos'
  // 🐶 Le 2ème paramètre de 'useOptimistic' est une fonction (un reducer)
  // 🐶 Cette fonction prend 2 paramètres: l'état actuel et la nouvelle todo
  // 🤖 (state, newTodo: Todo) => [...state, newTodo]

  const handleClick = async () => {
    if (inputValue === '') {
      toast.error('Please enter a todo.')
      return
    }
    const newTodo = {
      // 🐶 Ajoute 'id', il est necessaire pour le type 'Todo', meme si normalement la BDD le gère
      // 🤖 id: optimisticTodos.length + 1,
      title: inputValue,
      isCompleted: false,
      updadtedAt: new Date().toISOString(),
    }
    // 🐶 Appelle 'addOptimisticTodo' avec la nouvelle todo avant d'appler le server Action
    try {
      await AddTodoAction(newTodo)
      // 🐶 deplace le 'toast' pour l'avoir directement après 'addOptimisticTodo', on ne veut pas attendre
      // on veut une interface reactive
      toast('Todo has been created.')
    } catch (error) {
      console.error('Error creating todo:', error)
      toast.error(`Failed to create todo.${error}`)
    }
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
          {/* ⛏️ supprime 'todos' et remplace le par 'optimisticTodos'  */}
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </div>
      </div>
    </div>
  )
}
