export async function GET() {
  const header = new Headers()
  header.append('Content-Type', 'application/json')
  const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
    headers: header,
  })
  const data = await res.json()

  return Response.json(data)
}
