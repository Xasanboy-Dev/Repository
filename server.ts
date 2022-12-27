import express, { Request, Response } from "express"
import { getMethod, postMethod, deleteMethod } from "./function/functions"
import { pool } from "./config/db"
import { read } from "fs"
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
server.get("/register", (req: Request, res: Response) => {
    try {
        res.render("register")
    } catch (error: any) {
        res.render("")
    }
})
server.get("/login", (req: Request, res: Response) => {
    try {
        res.render("login")
    } catch (error) {
        res.render("")
    }
})
server.post("/info", async (req: Request, res: Response) => {
    try {
        const { email, name, password, lastname } = req.body
        const allusers = (await pool.query(`SELECT * FROM xasanboy`)).rows
        let arr: any = []
        for (let r in allusers) {
            if (allusers[r].email == email && allusers[r].name == name && allusers[r].password == password && allusers[r].lastname == lastname) {
                arr.push(allusers[r])
            }
        }
        if (arr.length == 0) {
            res.render("")
        } else {
            const user = arr[0]
            res.render("info", { user })
        }
    } catch (error) {
        res.render("")
    }
})
server.get("/info", (req: Request, res: Response) => {
    try {
    } catch (error) {
        res.render("")
    }
})
server.post("/register", postMethod)
server.listen(PORT, () => {
    console.log(`Server: http://localhost:${PORT}`)
})

