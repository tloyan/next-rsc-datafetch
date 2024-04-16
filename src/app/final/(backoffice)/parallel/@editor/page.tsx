const Page = () => {
  // Définition de l'objet utilisateur
  const user = {
    nom: 'Doe',
    prenom: 'John',
    adresse: '123 Rue de la Liberté, 75000 Paris',
  }

  return (
    <div className="mx-auto max-w-4xl p-5">
      <h1 className="mb-4 text-2xl font-bold text-gray-100">
        Profil Utilisateur (Role Editor)
      </h1>
      <div className="rounded-lg p-6 shadow-md">
        <p className="text-lg text-gray-100">
          <span className="font-semibold">Nom:</span> {user.nom}
        </p>
        <p className="text-lg text-gray-100">
          <span className="font-semibold">Prénom:</span> {user.prenom}
        </p>
        <p className="text-lg text-gray-100">
          <span className="font-semibold">Adresse:</span> {user.adresse}
        </p>
      </div>
      <div className="flex justify-end gap-4">
        <button className="border-white-60 text-wwhite-600 hover:bg-sslate00 rounded-md border px-4 py-2 text-sm transition-colors hover:text-black">
          Éditer
        </button>
      </div>
    </div>
  )
}

export default Page
