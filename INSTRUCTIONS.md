# Server Actions

### 💡 Comprendre les server actions

## 📝 Tes notes

Detaille ce que tu as appris ici, sur une page [Notion](https://go.mikecodeur.com/course-notes-template)

## Comprendre

Dans les applications clients React, le client peut envoyer des données vers un server via des API REST par exemple. Cela nécessite de créer un `endpoint` http avec du code serveur pour exécuter l’action sur le serveur.

Avec l’arrivé des server actions il est possible d’interagir avec le backend plus facilement.

Les Server Actions sont des fonctions asynchrones exécutées sur le serveur. Elles peuvent être utilisées dans les composants côté serveur et côté client pour gérer les soumissions de formulaires et les mutations de données dans les applications Next.js.

Il est possible d’appeler des server actions de puis de composant Server ou Client

- Appel depuis un RSC : une fonction `async` avec la directive `“use server”`

```tsx
// Server Component
export default function Page() {
  // Server Action
  async function create() {
    'use server'

    // ...
  }

  return (
    // ...
  )
}
```

- Appel depuis un RCC

Il n’est pas possible d’inclure la directive `'use server'` dans un fichier client. Il faut donc créer les actions dans un fichier à part contenant la directive `'use server'` exemple

```tsx
//actions.ts
'use server'

export async function create() {
  // ...
}
```

```tsx
import { create } from '@/app/actions'

export function Button() {
  return (
    // ...
  )
}
```

📑 Le liens vers la doc [https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)

## Exercice

Dans cet exercice nous avons un RSC qui appel `getTodos` une liste de taches venant de notre base de données.

```tsx
//app/todos/page.tsx
const Page = async () => {
  const todos = await getTodos()
  return (
    <div className="mx-auto max-w-4xl p-6 text-lg">
      <h1 className="mb-4 text-center text-3xl font-bold">Todo</h1>
      <Todos todos={todos ?? []} />
    </div>
  )
}
```

👨‍✈️ Hugo le chef de projet te demande d’implémenter l’ajout de taches dans la base de données. Il te fournis une librairie contenant la fonction `addTodo` qui ajoute en base de données.

```tsx
import {addTodo as addTodoDao} from '@/db/sgbd'
//insertion
addTodoDao(todo) //

```

Pour simplifier l’exercice les vues sont déjà créées `todos-view` et `todo-item`.

- Dans un premier temps essaye d’implémenter `addTodoDao` dans `todos-view`.
- Ensuite dans le fichier `action.ts`

<aside>
💡 Note : Pour simuler un temps server long nous avons configurer dans `sgbd.ts`

</aside>

```tsx
const slowConnexion = true
const serverResponseTime = 2000
```

<aside>
💡 Note 2 . Il est possible de supprimer `/src/db/db.json` pour avoir une bdd fraiche

</aside>

Fichiers

- `exercises/todos/todo-view.ts`
- `exercises/todos/action.ts`

## Bonus

### 1. 🚀 Gérer les erreurs

Il est important de gérer correctement les erreurs coté serveur. Pour cela nous allons générer des erreurs aléatoirement grâce à

```tsx
//src/db/sgbd.ts
const randomError = true
```

Avec sonner il est possible d’afficher des toasts d’erreur grâce à

```tsx
 import {toast} from 'sonner'
 //
 toast.error(`Une erreur est survenue`)
```

🐶 Dans cette exercice tu vas devoir gérer 2 types d’erreurs.

- Une erreur client si le taches est vide “Veuillez entrer un nom de tache”
- Une erreur en cas de problème coté server action (utilise un try catch pour cela)

Fichiers

- `exercises/todos/todo-view.ts`

### 2. 🚀 Mise à jour d’une tache (update server action)

🐶 Dans cet exercice tu vas devoir implémenter la mise à jour de la tache (completed ou non). Pour cela tu vas a ta disposition un fonction `updateTodo` qui met à jour la base de données.

```tsx
import {updateTodo as  updateTodoDao} from '@/db/sgbd'
//mise à jour
updateTodoDao(todo) //
```

Tu as également à ta disposition `todo-item` un component qui contient une `Checkbox`

```tsx
   const handleChange = async (isCompleted: boolean) => {
    console.log('isCompleted', isCompleted)
  }

 <Checkbox
    checked={todo.isCompleted}
    id={`${todo.id}`}
    onCheckedChange={(checked) => handleChange(checked as boolean)}
  />


```

- 🐶 Dans un premier temps créer le server action `updateTodo`
- 🐶 Utilise le dans la vue en gérant également les possible erreur

Fichiers

- `exercises/todos/todo-item.ts`
- `exercises/todos/action.ts`

### 3. 🚀 Cache et revalidatePath

En mode développement le comportement n’est pas identique à un build de production. Dans le cas de notre Todo App par exemple, lorsque l’on met à jour les données via un server action, le serveur rafraichie les données. Mais il faut faire attention car en production le fonctionnement est diffèrent. Il faut toujours vérifier les comportement avec un build de production

```bash
npm build
npm start
```

En lançant notre projet en mode production on se rend compte que l’or de l’ajout /mise à jour de données en bdd, les données ne sont pas mise à jour à l’écran.

Explication :

- Lors du build de production, `next` va générer un fichier statique contenant le nombre de Todos en base de données dans le but de performance.
- Lorsque des données sont modifier il faut spécifier à next de revalider (régénérer) une page à jour.

Next propose une gestion très fine du cache via l’API cache et notamment `revalidatePath` qui permet de revalider un segment de route.

📑 Le lien vers la doc [https://nextjs.org/docs/app/api-reference/functions/revalidatePath](https://nextjs.org/docs/app/api-reference/functions/revalidatePath)

- 🐶 dans cet exercice tu vas devoir faire en sorte que les données soit revalider après chaque mise à jour. tout ce passe dans `action.ts`

Fichiers

- `exercises/todos/action.ts`

### 4. 🚀 Sérialisation

🐶 Hugo le Chef de projet te demande de valider le `title` de la Tache avec une Regex

- Le titre doit commencer par une lettre majuscule.
- Le titre peut contenir des lettres, des chiffres, des espaces, des tirets (-) ou des underscores (\_).
- Le titre doit avoir une longueur minimale de 3 caractères et maximale de 50 caractères.

Il te fournis la Regex suivante

```tsx
const titlePattern = /^[A-Z][A-Za-z0-9 _-]{2,49}$/;
const titlePattern = new RegExp(titlePattern);
!pattern.test(todo.title)
```

Il souhaite que la Regex puis être passé depuis le client et executé depuis le server.

- 🐶 Implémente le code suivant

```tsx
//CLIENT CODE
const handleChange = async (isCompleted: boolean) => {
    const pattern = /^[A-Z][\w -]{2,49}$/
    const regex = new RegExp(pattern)
    try {
      await updateTodoAction(
        {
          ...todo,
          isCompleted,
        },
        regex
      )
    } catch (error) {
      toast.error(`Failed to update todo.${error}`)
    }
  }
//SERVER ACTION
export const updateTodo = async (todo: Todo, reg: RegExp) => {
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
```

Comme tu peux le constater tu obtiens un message

```tsx
Failed to update todo.Error: Only plain objects, and a few built-ins, can be passed to Server Actions. Classes or null prototypes are not supported
```

Ce qui est normal car les paramètres ne peut être que des valeurs `sérialisable`

📑 doc [https://react.dev/reference/rsc/use-server#serializable-parameters-and-return-values](https://react.dev/reference/rsc/use-server#serializable-parameters-and-return-values)

🐶 Adapte le code en ne passant que cela en paramètre du server action

**🤖** `const pattern = /^[A-Z][\w -]{2,49}$/`

Et en instanciant la `RegEx` coté server

### 5. 🚀 revalidate

Les données en cache peuvent être revalider de 2 manières :

- De manière manuelle (exercice précèdent `revalidatePath` ou `revalidateTag`)
- De manière temporelle

Prenons le cas ou notre bdd serait partager avec une autre application. Par exemple de nouvelle tache arrivent dans la liste.

Il est possible de revalider les donnée tous les X secondes, minutes, heures. Pour cela il est possible de spécifier cela via `revalidate` (depuis une route handler)

```tsx
//page.tsx ou layout.tsx
export const revalidate = 3600 // revalidate at most every hour
```

- 🐶 Dans cet exercice tu vas modifier manuellement le fichier `db.json.` Normalement (en production) les données ne devraient être visible dans la vue.
- Ajoute une revalidation toutes les 10 secondes

Fichiers

- `exercises/todos/page.tsx`

## Aller plus loin

📑 Le lien vers la doc [https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating)

## Ils vont t’aider

- **🐶 Mowgli le Chien** : _Mowgli te guidera dans chaque exercice._
- **🤖 Ash le Robot** : _Ash le Robot te donnera du code utile._
- **🚀 Julia La roquette** : _Julia te donnera des défis supplémentaires._
- **⛏️ Hulk le Marteau** : _Quand du code à supprimer est présent_
- **👨‍✈️ Hugo le chef de projet** : _Va t'aider sur les spécifications du projet_

## 🐜 Feedback

Remplir le formulaire le [formulaire de FeedBack](https://go.mikecodeur.com/cours-next-avis?entry.1912869708=Next%20PRO&entry.1430994900=3.RSC%20Data%20fetch&entry.533578441=04%20Server%20actions).
