const notes = require('express').Router();
const {readFile, writeFile} = require('fs').promises;
const { v4: uuidv4} = require('uuid');

// GET /api/notes
// sends back the contents of /db/db.json as json
notes.get('/', (req, res) => {
    readFile('./db/db.json').then( (data) => res.json(JSON.parse(data)))
});

// POST /api/notes
// Adds the record sent in the body to /db/db.json
notes.post('/', (req,res) => {
    readFile('./db/db.json').then( (data) => {
        return JSON.parse(data)
    }).then( (dataSet) => {
        // uuid generates a unique key for each added record
        addNote = {
            id: uuidv4(),
            title: req.body.title,
            text: req.body.text
        }
        dataSet.push(addNote)
        writeFile('./db/db.json', JSON.stringify(dataSet))
    }).then (() => {
        res.send('')
    })
})

// DELETE /api/notes
// Deletes the record from /db/db.json that has the id matching the path after /api/notes/
notes.delete('*', (req,res) => {
    let deleteId = req.path.substring(1)
    
    readFile('./db/db.json').then( (data) => {
        return JSON.parse(data)
    }).then( (dataSet) => {    
        let delIndex = dataSet.findIndex( note => note.id === deleteId)
        dataSet.splice(delIndex,1)
        writeFile('./db/db.json', JSON.stringify(dataSet))
    }).then (() => {
        res.send('')
    })

})

module.exports = notes;