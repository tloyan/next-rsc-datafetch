'use server'

import {addTodo as addTodoDao} from '@/db/sgbd'
import {Todo} from '@/lib/type'

export const addTodo = async (todo: Todo) => {
  try {
    await addTodoDao(todo)
    console.log('Successfully add todo', todo)
  } catch (error) {
    console.error('Failed to update todo', error)
    throw error
  }
}
