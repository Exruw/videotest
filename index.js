const express = require("express")
const path = require("path")
const fs = require("fs")
const app = express()
const vids = (function(){
let videos = ""
let files = fs.readdirSync(path.join(__dirname, "videos"))
    
files.forEach((file) => {
        videos += "\t'videos/" + file.name + "',\n"
})
  
return videos.substring(0, videos.length - 2)
})()

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"))
})

// REDIRECTION

app.get("/index.html", (req, res) => {
    res.redirect("/")
})

app.get("/videos/index.html", (req, res) => {
    res.redirect("/videos")
})

app.get("/contact.html", (req, res) => {
    res.redirect("/contact")
})

// yes this is spaghetti code  ill remake later

app.get("/HUBCHICKEN.png", (req, res) => {
    res.sendFile(path.join(__dirname, "/HUBCHICKEN.png"))
})

app.get("/icon.svg", (req, res) => {
    res.sendFile(path.join(__dirname, "/icon.svg"))
})

app.get("/style.css", (req, res) => {
    res.sendFile(path.join(__dirname, "/style.css"))
})

app.get("/video-array.js", (req, res) => {
    
    
    res.send(`
var videoArray = [\n${vids}\n]

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

app.use(function(req, res, next) {
  res.status(404).sendFile(path.join(__dirname, "404.html"))
})

app.listen(8080)
