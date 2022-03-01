const express = require("express")
const path = require("path")
const fs = require("fs")
const app = express()

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"))
})

// yes this is spaghetti code 

app.get("/video-array.js", (req, res) => {
    let videos = ""
    let files = fs.readdirSync("./videos/")
    
    files.forEach((file) => {
        videos += "\t'videos/" + file.name + "',\n"
    })
  
    videos = videos.substring(0, videos.length - 2)
    
    res.send(`
var videoArray = [\n${videos}\n]

export function getArray() {
  return videoArray
}

export function getRandomVideo() {
  return videoArray[Math.floor(Math.random() * videoArray.length)]
}
    `)
})

app.get("/videos", (req, res) => {
    res.sendFile(path.join(__dirname, "videos", "index.html"))
})

app.get("/videos/:file", (req, res) => {
    res.sendFile(path.join(__dirname, "videos", req.params.file))
})

app.get("/molly/:file", (req, res) => {
    res.sendFile(path.join(__dirname, "molly", req.params.file))
})

app.get("/cdn/:file", (req, res) => {
    res.sendFile(path.join(__dirname, "cdn", req.params.file))
})

app.get("/assets/:file", (req, res) => {
    res.sendFile(path.join(__dirname, "assets", req.params.file))
})

app.listen(8080)
