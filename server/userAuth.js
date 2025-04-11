import usersData from "./usersData.json" with {type: "json"}

function authenticateUser(req, res, next) {
    console.log(req.cookies)
    console.log(req.headers)
    const {uid} = req.cookies;
    const user = usersData.find((user) => user.userId === uid)
    if(!user || !uid) {
        return res.status(400).json({message: "not logged in"})
    }
    req.user = user
    next()
}

export default authenticateUser;