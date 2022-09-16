    var express =   require("express");
    var multer  =   require('multer');
    var bodyParser = require('body-parser');
    var fs = require("node:fs");
    require("dotenv").config();
    var morgan = require("morgan")
    var app = express();
    app.set("view engine", "ejs")
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    
    var storage =   multer.diskStorage({
      destination: function (req, file, callback) {
        callback(null, './memory');
      },
      filename: function (req, file, callback) {
        var klasor = fs.readdirSync("./memory");
        console.log(file.originalname);    
        //if()
        callback(null, file.originalname);
      }
    });
    app.use(morgan('dev'))
    var upload = multer({ storage : storage}).single('file');
    app.get("/temp/:id", (req, res) => {
        var id = req.params.id;
        if(req.query.pass !== process.env.password){
          return res.send("Access Denied")
        }
        if(!__dirname+`/memory/${id}`)return res.send("Wut??");
        return res.sendFile(__dirname+`/memory/${id}`);
        
    })
    app.get("/",express.static(__dirname+"/memory"))
    app.get("/upload",(req, res) => {
        res.render("index");
    })
    app.post('/upload',function(req,res){
      console.log(JSON.stringify(req.body.pass  ) + "asdasd  ")
      if(req.body.pass !== process.env.password){
        return res.send("Access Denied")
      }
        upload(req,res,function(err) {
            if(err) {
                console.log(err)
                return res.end("Error uploading file.");
            }
            console.log("file uploaded");
            res.send("file uploaded")
        });
    });
    app.delete('/upload', function(){
      if(req.body.pass !== process.env.password){
        return res.send("Access Denied.")
      }
      const mem = require(`./memory/${req.query.fileName}`)
    })
    app.listen(3000,function(){
        console.log("Working on port 3000");
    });