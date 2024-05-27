// 🐶 Ajoute la directive 'use server' pour specifier que nous faisons des server actions
// 🤖 'use server'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {addTodo as addTodoDao} from '@/db/sgbd'
import {AddTodo} from '@/lib/type'

export const addTodo = async (todo: AddTodo) => {
  console.log('add todo action', todo)
  // 🐶 appelle 'addTodoDao(todo)' dans un 'try catch',
  // En effet il faut pouvoir gérer les erreurs d'insersion en bdd.
  // Fait un `console.error` en cas d'erreur
  // et throw l'erreur pour la remonter au client

  //🐶 pense à utiliser cette action dans todos-view
}

//🐶 N'oublie pas les exercice bonus
