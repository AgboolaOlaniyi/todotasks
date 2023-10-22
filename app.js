const express = require('express')
const userRoute = require("./users/user.route")
const bodyparser = require("body-parser")
const taskRoute = require("./tasks/task.route")
const auth = require("./authentication/auth")
const cookieParser = require("cookie-parser")
const taskModel = require("./models/task")




const app = express()

app.set("view engine", "ejs")
app.set("views", "views")

app.use(bodyparser.urlencoded({ extended: false }))

app.use(cookieParser())
app.use("/users", userRoute)
app.use("/tasks", auth.userEnsureLogin, taskRoute)
app.use("/public", express.static("Public"))





app.get("/", (req, res) => {
    res.status(200).render("index")
})

app.get("/signup", (req, res) => {
    res.status(200).render("signup")
})


app.get("/login", (req, res) => {
    res.status(200).render("login")
})

app.get("/index", (req, res) => {
    res.status(200).render("index")
})


app.get("/dashboard", auth.userEnsureLogin, async (req, res) => {
        const taskInfos = await taskModel.find({ user_id: res.locals.user._id })
           res.status(200).render("dashboard", {
            user: res.locals.user, taskInfos, date: new Date()
        }) 
  
    })

app.get("/create_task", auth.userEnsureLogin, (req, res) => {
    res.status(200).render("create_task")
})

app.get("/logout", (req, res) => {
    res.clearCookie("jwt")
    res.render("index")
})

app.get("*", (req, res)=>{
    res.status(404).render("pageNotFound")
})

// app.use((err, req, res, next) => {
//     console.error(err.stack)
//     res.status(500).json({
//         data: null,
//         error: 'Server Error'
//     })
// })



module.exports = app