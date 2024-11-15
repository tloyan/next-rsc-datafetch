'use server'

import {revalidatePath} from 'next/cache'
import {addTodo as addTodoDao, updateTodo as updateTodoDao} from '@/db/sgbd'

import {AddTodo, Todo} from '@/lib/type'

export const addTodo = async (todo: AddTodo) => {
  console.log('add todo action', todo)
  try {
    await addTodoDao(todo)
    revalidatePath('/exercices/todos')
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const updateTodo = async (todo: Todo, pattern: string) => {
  const reg = new RegExp(pattern)
  if (!reg.test(todo.title)) {
    throw new Error("Le titre de la tâche n'est pas valide.")
  }
  try {
    await updateTodoDao(todo)
  } catch (error) {
    console.error('Failed to update todo', error)
    throw error
  } finally {
    revalidatePath('/exercises/todos')
  }
}
