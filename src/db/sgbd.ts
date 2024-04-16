import { JSONFilePreset } from "lowdb/node";

export default async function db() {
  const db = await JSONFilePreset('db.json', { posts: [] })
}
