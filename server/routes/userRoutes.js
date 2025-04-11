import express from "express"
import crypto from "crypto"
import usersData from "../usersData.json" with {type: "json"}
import { writeFile } from "fs/promises";
import authenticateUser from "../userAuth.js";

const router = express.Router();


router.get('/', authenticateUser, (req, res) => {
    res.status(200).json({
        name: req.user.name,
        email: req.user.email
    })
})


router.post("/register", async (req, res) => {
    const id = crypto.randomUUID();
    const { name, email, password } = req.body;
    const userFound = usersData.find((user) => user.email === email);
    if(userFound) return res.status(409).json({message: "User already exists"})

    usersData.push(
        {
            userId: id,
            name,
            email,
            password,
            blogs: []
        }
    )

    try{
        await writeFile("./usersData.json", JSON.stringify(usersData))
        res.cookie('uid', id, {maxAge: 1000*60*60*24, httpOnly:true, sameSite:"lax", secure: false})
        res.status(200).json({message: "Registration successful!"})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})


router.post("/login", (req, res) => {
    const { email, password } = req.body;
    const user = usersData.find((user) => user.email === email)
    if(!user || user.password !== password) {
        return res.status(400).json({message: "Invalid email or password"})
    }

    res.cookie("uid", user.userId, {
        maxAge: 1000*60*60*24,
        httpOnly: true,
        sameSite: "lax",
        secure: false
    })

    res.status(200).json({message: "Login Successful"})
})

router.get('/logout', (req, res) => {
    res.clearCookie('uid');
    res.status(200).json({message: "Logout Successful"})
})

export default router;