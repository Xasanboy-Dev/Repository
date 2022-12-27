import express, { Request, Response } from "express"
import ejs from "ejs"
import { getMethod, postMethod, deleteMethod } from "./function/functions"
import { pool } from "./config/db"
const server = express()
server.set("view engine", "ejs")
const PORT = 8080
server.use(express.json())
server.use(express.urlencoded({ extended: false }))
// Get Method
server.get("/", getMethod)
// Post Method
server.post('/', postMethod)
// Delete Method
server.delete("/:id", deleteMethod)
server.get("/users", async (req: Request, res: Response) => {
    try {
        const user = (await pool.query(`SELECT * FROM xasanboy`)).rows
        res.render("index", { user })
    } catch (error: any) {
        res.render("error", { error: error.message })
    }
})
server.get("/register",(req:Request,res:Response)=>{
    res.render("register")
})
server.listen(PORT, () => {
    console.log(`Server: http://localhost:${PORT}`)
})

