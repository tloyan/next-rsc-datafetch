import {Checkbox} from '@/components/ui/checkbox'
import {Todo, updateTodo} from '@/db/sgbd'
import {cn} from '@/lib/utils'
import clsx from 'clsx'
import {startTransition, useOptimistic} from 'react'

export default function TodoItem({todo}: {todo: Todo}) {
  const [optimisticTodo, updateOptimisticTodo] = useOptimistic(
    todo,
    (
      _todo,
      {isCompleted, updadtedAt}: {isCompleted: boolean; updadtedAt: string}
    ) => {
      return {..._todo, isCompleted, updadtedAt}
    }
  )
  const handleChange = async (isCompleted: boolean) => {
    updateOptimisticTodo({isCompleted, updadtedAt: new Date().toISOString()})
    await updateTodo({
      ...todo,
      isCompleted,
      updadtedAt: new Date().toISOString(),
    })
  }
  return (
    <>
      <div className="flex items-center gap-4" key={optimisticTodo.id}>
        <Checkbox
          id={`${optimisticTodo.id}`}
          onCheckedChange={(checked) =>
            startTransition(() => handleChange(checked as boolean))
          }
        />
        <label
          className="flex-1 text-sm font-medium"
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
          {new Date(todo.createdAt ?? new Date()).toLocaleDateString('fr-FR')}
        </span>
      </div>
    </>
  )
}
