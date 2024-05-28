import {Checkbox} from '@/components/ui/checkbox'
import {cn} from '@/lib/utils'
import {Todo} from '@/lib/type'
import {updateTodo as updateTodoAction} from './actions'
import {toast} from 'sonner'

// 🐶 Créer 2 types 'TodoOptimistic' et 'OptimisticFields'
// 'TodoOptimistic' Le type du State de l'optimistic hook (Todo + sending: boolean)
// 'OptimisticFields' Le type des champs en entrée de la fonction de mise à jour de l'optimistic hook (reducer)

// 🤖
// type TodoOptimistic = Todo & {
//   sending?: boolean
// }

// type OptimisticFields = {isCompleted: boolean; sending: boolean}

export default function TodoItem({todo}: {todo: Todo}) {
  // 🐶 Utiliser l'optimistic hook pour gérer l'état optimiste du todo
  // 🐶 Aide au typage : useOptimistic<TypeDuState, TypeOptmisticValue>

  // 🤖 const [optimisticTodo, updateOptimisticTodo] = seOptimistic<TypeDuState, TypeOptmisticValue>(todo, reducer)
  // 🐶 le 'reducer' est une fonction avec 2 params (state, {isCompleted, sending})  qui merge tous les champs (utilise un spread operator)

  const handleChange = async (isCompleted: boolean) => {
    // 🐶 appelle ici 'updateOptimisticTodo' en indiquant sending true
    try {
      await updateTodoAction({
        ...todo,
        isCompleted,
      })
    } catch (error) {
      toast.error(`Failed to update todo.${error}`)
    } // 🐶 appelle ici 'updateOptimisticTodo' en indiquant sending false
  }
  return (
    <>
      {/* 🐶 remplace tous les 'todo' par 'optimisticTodo' */}
      <div className="flex items-center gap-4" key={todo.id}>
        <Checkbox
          checked={todo.isCompleted}
          id={`${todo.id}`}
          // 🐶 appelle handleChange dans startTransition
          onCheckedChange={(checked) => handleChange(checked as boolean)}
        />
        <label
          className={cn('flex-1 text-sm font-medium', {
            'line-through': todo.isCompleted,
            // 🐶 ajoute la classe 'animate-color-cycle' si sending est true
          })}
          htmlFor={`${todo.id}`}
        >
          {todo.title}
        </label>

        <span
          className={cn('text-sm text-gray-500 dark:text-gray-400 ', {
            'line-through': todo.isCompleted,
          })}
        >
          {todo.updadtedAt}
        </span>
      </div>
    </>
  )
}
