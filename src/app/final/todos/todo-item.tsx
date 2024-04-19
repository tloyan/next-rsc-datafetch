import {Checkbox} from '@/components/ui/checkbox'
import {Todo} from '@/db/sgbd'
import {cn} from '@/lib/utils'
import {toast} from 'sonner'
import {startTransition, useOptimistic} from 'react'
import {updateTodo as updateTodoAction} from './actions'
//import React from 'react'

type TodoOptimistic = Todo & {
  sending?: boolean
}

type OptimisticFields = {isCompleted: boolean; sending: boolean}

export default function TodoItem({todo}: {todo: Todo}) {
  //optimistic pattern
  const [optimisticTodo, updateOptimisticTodo] = useOptimistic<
    TodoOptimistic,
    OptimisticFields
  >(todo, (state, {isCompleted, sending}: OptimisticFields) => {
    return {...state, isCompleted, sending}
  })

  const handleChange = async (isCompleted: boolean) => {
    updateOptimisticTodo({isCompleted, sending: true})
    try {
      await updateTodoAction({
        ...todo,
        isCompleted,
      })
    } catch (error) {
      toast.error(`Failed to update todo.${error}`)
    } finally {
      updateOptimisticTodo({isCompleted, sending: false})
    }
  }
  return (
    <>
      <div className="flex items-center gap-4" key={optimisticTodo.id}>
        <Checkbox
          checked={optimisticTodo.isCompleted}
          id={`${optimisticTodo.id}`}
          onCheckedChange={(checked) =>
            startTransition(() => handleChange(checked as boolean))
          }
        />
        <label
          className={cn('flex-1 text-sm font-medium', {
            'line-through': optimisticTodo.isCompleted,
            'animate-color-cycle': optimisticTodo.sending,
          })}
          htmlFor={`${optimisticTodo.id}`}
        >
          {optimisticTodo.title}
        </label>

        <span
          className={cn(
            'text-sm text-gray-500 dark:text-gray-400 ',
            {'line-through': optimisticTodo.isCompleted} // Ajoute 'line-through' si isCompleted est vrai
          )}
        >
          {optimisticTodo.updadtedAt}
          {/* {new Date(optimisticTodo.createdAt ?? new Date()).toLocaleDateString(
            'fr-FR'
          )}{' '}
          (mise à jour{' '}
          {new Date(optimisticTodo.updadtedAt ?? new Date()).toLocaleTimeString(
            'fr-FR'
          )}
          ) */}
        </span>
      </div>
    </>
  )
}
