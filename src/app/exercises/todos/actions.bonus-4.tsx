'use server'

import {addTodo as addTodoDao, updateTodo as updateTodoDao} from '@/db/sgbd'
import {AddTodo, Todo} from '@/lib/type'
import {revalidatePath} from 'next/cache'

export const addTodo = async (todo: AddTodo) => {
  console.log('add todo action', todo)
  try {
    await addTodoDao(todo)
  } catch (error) {
    console.error('Failed to add todo', error)
    throw error
  } finally {
    revalidatePath('/exercises/todos')
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
