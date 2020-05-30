// Create express app
var express = require("express")
const bodyParser = require("body-parser");
const app = express();
const fs = require("fs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

var db = require("./database.js")

// Server port
var HTTP_PORT = 8000 
// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});
// Root endpoint
app.get("/", (req, res, next) => {
    res.json({"message":"Ok"})
});

app.get("/books", (req, res, next) => {
    var sql = "select * from books"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});

app.post("/book", (req, res) => {
  var errors = [];
  if (!req.body.title) {
    errors.push("No title specified");
  }
  if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }
    var data = {
        title: req.body.title
    }
    var sql ='INSERT INTO books (title) VALUES (?)'
    var params =[data.title]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id" : this.lastID
        })
    });
  //res.json({ message: "Ok" });
});

app.delete("/book/:id", (req, res, next) => {
    db.run(
        'DELETE FROM books WHERE id = ?',
        req.params.id,
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({"message":"deleted", changes: this.changes})
    });
});

///-----------------------publications API development-----------------------//

app.get("/publications", (req, res, next) => {
    var sql = "select * from publications"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});

app.post("/publication", (req, res) => {
    var errors = [];
    
    if (!req.body.title) {
      errors.push("No title specified");
    }
    if (!req.body.author) {
      errors.push("No author specified");
    }
    if (!req.body.category) {
      errors.push("No category specified");
    }
    if (!req.body.price) {
      errors.push("No price specified");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }
    console.log(req.body.author);
    var data = {
        title: req.body.title,
        author: req.body.author,
        category: req.body.category,
        price: req.body.price
    }
    var sql ='INSERT INTO publications (title, author, category, price) VALUES (?,?,?,?)'
    var params =[data.title, data.author, data.category, data.price]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id" : this.lastID
        })
    });
    //res.json({ message: "Ok" });
  });

app.delete("/publication/:id", (req, res, next) => {
    db.run(
        'DELETE FROM publications WHERE id = ?',
        req.params.id,
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({"message":"deleted", changes: this.changes})
    });
});

// Insert here other API endpoints

// Default response for any other request
app.use(function(req, res){
    res.status(404);
});