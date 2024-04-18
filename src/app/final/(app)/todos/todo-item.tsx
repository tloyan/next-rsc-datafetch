import {Checkbox} from '@/components/ui/checkbox'
import {Todo} from '@/db/sgbd'
import {cn} from '@/lib/utils'
import {toast} from 'sonner'
import {startTransition, useOptimistic} from 'react'
import {updateTodo as updateTodoAction} from '../../actions'

export default function TodoItem({todo}: {todo: Todo}) {
  //console.log('todo -item', todo)
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
    console.log('handleChange isCompleted', isCompleted)
    const data = {isCompleted, updadtedAt: new Date().toISOString()}
    updateOptimisticTodo(data)

    try {
      await updateTodoAction({
        ...todo,
        ...data,
      })
    } catch (error) {
      toast.error(`Failed to update todo.${error}`)
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
          // onCheckedChange={(checked: boolean) =>
          //   handleChange(checked as boolean)
          // }
        />
        <label
          className={cn('flex-1 text-sm font-medium', {
            'line-through': optimisticTodo.isCompleted,
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
