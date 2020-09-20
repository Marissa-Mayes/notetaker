const fs = require("fs");
const dbPath =("../db/db.json")
const path = require("path")

module.exports = function (app) {
  //json data in variable//
  let noteDb= JSON.parse(fs.readFileSync(path.join(__dirname, "../db/db.json"), (err,data)=>{
    if (err) throw err;
    console.log(err,data)
  }));
  app.get("/api/notes", function(req, res) {
    return res.json(noteDb);

  })
  // writes note to dbjson file//
  
  const writeDataBaseFile = function(note) {
    fs.writeFileSync(path.join(__dirname, "../db/db.json"), JSON.stringify(note), (err,data) =>{
      if (err) throw err;
    })
  }
//post note to server
  app.post("/api/notes", (req, res) => {
    let newEntry= req.body;
    let noteID = parseInt(noteDb.length)+1;
    
    newEntry.id=noteID;
    noteDb.push(newEntry);
    writeDataBaseFile(noteDb);
    return res.json(noteDb);

    //possible steps read file dbson file, 
    //parse data result is js array
    // add note into array method is push 
    // write file updated notes stringafy array  then add to file
    //res.json

  })

  app.delete("/api/notes/:id", (req, res) => {
    let noteID = (req.params.id);
    noteDb= noteDb.filter((note) =>{
      return note.id !=req.params.id
    })
    writeDataBaseFile(noteDb);
    return res.json(noteDb)
    
    
  })


}

/*
//GET /api/notes - Should read the db.json file and return all saved notes as JSON.


POST /api/notes - Should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client.


Dpi/notes/:id - Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique id when it's saved. In order to delete a ELETE /anote, you'll need to read all notes from the db.json file, remove the note with the given id property, and then rewrite the notes to the db.json file.*/
