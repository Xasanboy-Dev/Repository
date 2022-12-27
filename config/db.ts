import { Pool } from "pg"
export const pool = new Pool({
    user: "postgres",
    database: "postgres",
    host: "localhost",
    port: 5432,
    password: "1234"
})
