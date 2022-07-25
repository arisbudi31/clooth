const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const path = require("path")
dotenv.config()

// const corsOption = {
//   exposedHeaders: 'authorization'
// }

const router = require("./src/routes")

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, "public")))

const db = require('./src/config')
db.connect(err => {
  if (err) {
    console.log("error: ", err)
  }

  console.log(`database is connected, thread id: ${db.threadId}`)
})

app.use("/api", router.category)
app.use("/api", router.product)
app.use("/api", router.stockopname)
app.use("/api", router.cart)
app.use("/api", router.user)
app.use("/api", router.adminRouter)

app.get("/", (req, res) => {
  res.status(200).send("Welcome to warehouse app server")
})

const port = process.env.PORT || 8000

app.listen(port, () => console.log(`App listen at port: ${port}`))