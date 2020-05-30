var sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE books (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title text
        )`,
        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows
                var insert = "INSERT INTO books (title) VALUES (?)";
                db.run(insert, ["A Timeless Boundary"]);
                db.run(insert, ["Around The World in 80 Days"]);
            }
        });

        db.run(`CREATE TABLE publications (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title text,
        author text,
        category text,
        price numeric
        )`,
        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows
                var insert = "INSERT INTO publications (title, author, category, price) VALUES (?,?,?,?)";
                db.run(insert, ["Origin","Dan Brown","Fiction", 12.3]);
                db.run(insert, ["Home","Toni Morrison", "Drama", 10.2]);
            }
        }); 
    }
});


module.exports = db