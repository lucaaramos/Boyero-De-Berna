const express = require("express")
const cors = require("cors")
const app = express()
const user = require("./routes/user.routes")
const event = require("./routes/event.routes")
const news = require("./routes/news.routes")
const images = require("./routes/image.routes")
const sponsors = require("./routes/sponsors.router")
const participants = require("./routes/eventParticipants.routes")
const path = require('path')


app.use(express.json())
app.use(cors());
app.use(express.static(path.join(__dirname,"optimize")))
app.use("/user",user)
app.use("/event",event)
app.use("/news",news)
app.use("/image",images)
app.use("/sponsors",sponsors)
app.use("/participant",participants)


app.listen(3001,()=>{
    console.log("server on port 3001")
})


