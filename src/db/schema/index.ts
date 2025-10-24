// Import the necessary Drizzle ORM functions
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

// Define the users table with the following fields:
// - id: The primary key of the table
// - name: The name of the user
// - age: The age of the user
// - email: The email of the user
export const usersTable = sqliteTable("users_table", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  age: integer("age").notNull(),
  email: text("email").notNull().unique(),
});