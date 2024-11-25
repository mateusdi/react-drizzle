import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core"
import { aula } from "./aulaSchema"

export const conteudo = sqliteTable("conteudo", {
  id: integer("id").primaryKey(),
  name: text("name"),
  aulaId: integer("aulaId").notNull().references(() => aula.id)
})