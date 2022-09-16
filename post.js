const superagent = require('superagent');
const fs = require("node:fs")
const filePath = fs.readdirSync("./asd")

const fi = `./asd/ekranalintisi.png`
superagent
    .post("http://localhost:3000/upload")
    .attach('file', './asd/1.jpg')
    .end()
