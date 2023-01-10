const express = require("express")
const fs = require("fs")
const cors = require("cors")
const app = express()
const port = 8080
app.use(cors())

app.get("/", (req, res) => {
  const file = fs.readFileSync("data.txt", "utf-8")
  const cameras = file
    .split(/\r?\n/)
    .map((line) => {
      if (line.substring(0, 3) !== "UTR") {
        return null
      }

      const lineSections = line.split(";")
      // will break if the code format changes
      const camera = {
        code: lineSections[0].substring(0, 10),
        number: lineSections[0].substring(7, 10),
        name: lineSections[0].substring(11),
        latitude: lineSections[1],
        longitude: lineSections[2],
      }
      return camera
    })
    .filter(Boolean)

  res.send(JSON.stringify(cameras))
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
