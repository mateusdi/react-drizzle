import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core"
import { aula } from "./aulaSchema"

export const frequencia = sqliteTable("frequencia", {
  id: integer("id").primaryKey(),
  name: text("name"),
  ausente: integer("ausente"),
  aulaId: integer("aulaId").notNull().references(() => aula.id)
})