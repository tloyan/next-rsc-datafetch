# Intercepter les routes

### 💡 Comprendre l’interception de routes

## 📝 Tes notes

Detaille ce que tu as appris ici, sur une page [Notion](https://go.mikecodeur.com/course-notes-template)

## Comprendre

L’interception de route permet de charger une route depuis une autre partie de l’application mais dans le `Layout` courant. Pour ce faire il faut etre sur un segment, avoir un lien vers une route a intercepter et placer un dossier contenant

- `(.)` pour matcher avec un segment du même niveau
- `(..)` pour matcher avec un segment d’un niveau supérieur
- `(..)(..)` pour matcher avec un segment de 2 niveaux supérieurs
- `(...)` pour matcher avec un segment a la racine

📑 Le liens vers la doc [https://nextjs.org/docs/app/building-your-application/routing/intercepting-routes](https://nextjs.org/docs/app/building-your-application/routing/intercepting-routes)

## Exercice

Dans cet exercice nous avons ajouté dans le backoffice un route `/intercept` pour les besoins de l’exercice. Cette route contient un lien vers les cgv `/cgv`. Lorsque l’on clique sur ce lien on arrive sur la partie `frontoffice` avec le layout du frontoffice qui affiche les CGV.

Dans cet exercice tu vas devoir intercepter la route `/cgv` dans le backoffice et afficher un contenu diffèrent dans le `layout` du backoffice.

- 🐶 créé un dossier `cgv` dans `intercept`contenant `page.tsx`
- Applique la bonne convention pour intercepter à la racine
- modifie `page.tsx` et ajoute le content intercepté

```tsx
const Page = () => {
  return (
    <div>
      <h1>CGV intercepted, valide ici les CGV</h1>
      <p>
        {`Utilisateur du backOffice, En utilisant ce service, vous acceptez les précautions d'utilisation.
        Veuillez les lire attentivement avant d'accéder ou d'utiliser le
        service.`}
      </p>
    </div>
  )
}

```

Fichiers & dossier

- `app/(backoffice)/intercept/`

## Aller plus loin

Cette méthode associée aux routes parallèles et très utilisé pour gérer les modales

📑 Le lien vers la doc [https://nextjs.org/docs/app/building-your-application/routing/intercepting-routes](https://nextjs.org/docs/app/building-your-application/routing/intercepting-routes)

## Ils vont t’aider

- **🐶 Mowgli le Chien** : _Mowgli te guidera dans chaque exercice._
- **🤖 Ash le Robot** : _Ash le Robot te donnera du code utile._
- **🚀 Julia La roquette** : _Julia te donnera des défis supplémentaires._
- **⛏️ Hulk le Marteau** : _Quand du code à supprimer est présent_
- **👨‍✈️ Hugo le chef de projet** : _Va t'aider sur les spécifications du projet_

## 🐜 Feedback

Remplir le formulaire le [formulaire de FeedBack.](https://go.mikecodeur.com/cours-next-avis?entry.1912869708=Next%20PRO&entry.1430994900=2.Routing%20Avance&entry.533578441=03%20Les%20interceptions%20de%20routes)
