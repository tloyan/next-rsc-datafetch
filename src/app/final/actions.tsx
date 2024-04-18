'use server'

import {
  Todo,
  addTodo as addTodoDao,
  getTodos as getTodosDao,
  updateTodo as updateTodoDao,
} from '@/db/sgbd'

import {revalidatePath} from 'next/cache'

export const getTodos = async () => {
  return await getTodosDao()
}

export const addTodo = async (todo: Todo) => {
  try {
    await addTodoDao(todo)
  } catch (error) {
    console.error('Failed to update todo', error)
    throw error
  } finally {
    revalidatePath('/final/todos')
  }
}

export const updateTodo = async (todo: Todo) => {
  try {
    await updateTodoDao(todo)
  } catch (error) {
    console.error('Failed to update todo', error)
    throw error
  } finally {
    revalidatePath('/final/todos')
  }
}
