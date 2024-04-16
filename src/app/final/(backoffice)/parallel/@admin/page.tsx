const Page = async () => {
  await new Promise((resolve) => {
    setTimeout(resolve, 5000)
  })

  return (
    <div className="mx-auto max-w-4xl p-5">
      <p className="text-gray-1 mb-4 text-2xl font-bold">Role ADMIN</p>

      <div className="flex justify-end gap-4">
        <button className="border-white-60 text-wwhite-600 hover:bg-sslate00 rounded-md border px-4 py-2 text-sm transition-colors hover:text-black">
          Ajouter
        </button>
        <button className="rounded-md border border-red-600 px-4 py-2 text-sm text-red-600 transition-colors hover:bg-red-600 hover:text-white">
          Supprimer
        </button>
      </div>
    </div>
  )
}

export default Page
