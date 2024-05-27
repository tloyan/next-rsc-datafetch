'use server'

import {addTodo as addTodoDao, getTodos as getTodosDao} from '@/db/sgbd'
import {AddTodo} from '@/lib/type'

export const getTodos = async () => {
  return await getTodosDao()
}

export const addTodo = async (todo: AddTodo) => {
  try {
    await addTodoDao(todo)
  } catch (error) {
    console.error('Failed to update todo', error)
    throw error
  }
}
