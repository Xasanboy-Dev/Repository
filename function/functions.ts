import { Request, Response } from "express"
import { pool } from "../config/db"
export const getMethod = async (req: Request, res: Response) => {
    try {
        const users = await pool.query(`SELECT * FROM xasanboy`)
        res.status(200).json(users.rows)
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export const postMethod = async (req: Request, res: Response) => {
    try {
        let allusers = (await pool.query(`SELECT * FROM xasanboy`)).rows
        const { name, lastname, email, password, country, gender } = req.body
        let arr: any = []
        for (let r in allusers) {
            let d = allusers[r]
            if (d.name == name && d.lastname == lastname && d.email == email && d.password == password && d.country == country && d.gender == gender) {
                arr.push(d)
            }
        }
        const user = await pool.query(`SELECT * FROM xasanboy`)
        if (arr.length == 0) {
            await pool.query(`INSERT INTO xasanboy (name,lastname,email,password,country,gender) VALUES ($1,$2,$3,$4,$5,$6)`, [name, lastname, email, password, country, gender])
            res.render("users", { user })
        } else {
            res.status(400).json({ message: "You have already registered!" })
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export const deleteMethod = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        await pool.query(`DELETE FROM xasanboy WHERE id = $1`, [id])
        res.status(200).json({ message: "Deleted succesfully" })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}