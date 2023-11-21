const notes = require('express').Router();
const {readFile, writeFile} = require('fs').promises;
const { v4: uuidv4} = require('uuid');

notes.get('/', (req, res) => {
    readFile('./db/db.json').then( (data) => res.json(JSON.parse(data)))
});

notes.post('/', (req,res) => {
    readFile('./db/db.json').then( (data) => {
        return JSON.parse(data)
    }).then( (dataSet) => {
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