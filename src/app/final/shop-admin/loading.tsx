export default function Loading() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-orange-100"></div>
      <span className="ml-2">Loading...</span>
    </div>
  )
}
