'use client'
import {Input} from '@/components/ui/input'
import {Button} from '@/components/ui/button'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {addTodo as addTodoDao} from '@/db/sgbd'
import TodoItem from './todo-item'

import {AddTodo, Todo} from '@/lib/type'
import React from 'react'

//🐶
async function addTodo(todo: AddTodo) {
  console.log('add todo action', todo)
  //'use server'

  // try {
  //   await addTodoDao(todo)
  // } catch (error) {
  //   console.error('Failed to update todo', error)
  //   throw error
  // }
}
interface TodosProps {
  todos: Todo[]
}
export default function Todos({todos}: TodosProps) {
  const [inputValue, setInputValue] = React.useState('')

  const handleClick = () => {
    addTodo({
      title: inputValue,
      isCompleted: false,
      updadtedAt: new Date().toISOString(),
    })
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
