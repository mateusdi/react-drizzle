import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core"

export const aula = sqliteTable("aula", {
  id: integer("id").primaryKey(),
  name: text("name"),
})