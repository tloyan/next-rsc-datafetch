'use client'
import {Input} from '@/components/ui/input'
import {Button} from '@/components/ui/button'

import React, {useOptimistic, startTransition} from 'react'
import {toast} from 'sonner'
import TodoItem from './todo-item'
import {Todo} from '@/db/sgbd'
import {addTodo as addTodoAction} from '../../actions'
interface TodosProps {
  todos: Todo[]
}

export default function Todos({todos}: TodosProps) {
  const [inputValue, setInputValue] = React.useState('')

  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, newTodo: Todo) => [...state, newTodo]
  )
  // console.log('todos -view', todos)
  //console.log('optimisticTodos -view', optimisticTodos)
  //(state, newTodo: Todo) => [...state, newTodo]
  const handleClick = async () => {
    const newTodo = {
      id: optimisticTodos.length + 1,
      title: inputValue,
      isCompleted: false,
      createdAt: new Date().toISOString(),
      updadtedAt: new Date().toISOString(),
    }

    startTransition(async () => {
      addOptimisticTodo(newTodo)
      toast('Todo has been created.')
      try {
        await addTodoAction(newTodo)
      } catch (error) {
        toast.error(`Failed to create todo.${error}`)
      }
    })
  }

  return (
    <div className="fle h-screen flex-col text-left">
      <div className="flex h-14 items-center border-b p-4">
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
          {optimisticTodos.map((todo) => (
            // <div className="flex items-center gap-4" key={todo.id}>
            //   {todo.title}
            // </div>
            <TodoItem key={todo.id} todo={todo} />
            // <div className="flex items-center gap-4" key={todo.id}>
            //   <Checkbox
            //     id={`${todo.id}`}
            //     onCheckedChange={(checked) =>
            //       startTransition(() => handleChange(checked as boolean))
            //     }
            //   />
            //   <label
            //     className="flex-1 text-sm font-medium"
            //     htmlFor={`${todo.id}`}
            //   >
            //     {todo.title}
            //   </label>
            //   <span className="text-sm text-gray-500 dark:text-gray-400">
            //     {new Date(todo.createdAt ?? new Date()).toLocaleDateString(
            //       'fr-FR'
            //     )}
            //   </span>
            // </div>
          ))}
        </div>
      </div>
    </div>
  )
}
