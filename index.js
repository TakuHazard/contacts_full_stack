const express = require('express')
const app = express()

const cors = require('cors')
app.use(cors())

var morgan = require('morgan')
app.use(express.json())




morgan.token('person', function(req,res){
    return JSON.stringify(req.body)
})

morgan.token('method', function(req,res){
    return req.method
})


app.use(morgan(':method :url :response-time :person',{
    skip : function(req,res){return req.method !== "POST"}
}))

// const requestLogger = (request, response, next) =>{
//     console.log('Method: ', request.method)
//     console.log('Path: ', request.path)
//     console.log('Body: ', request.body)
//     console.log('---')
//     next()
// }

// app.use(requestLogger)

let persons = [
    {
        name : "Arto Hellas",
        number : "040-12456",
        id:1
    },
    {
        name : "Ada Lovelace",
        number: "39-902384893",
        id: 2
    },
    {
        name: "Dam Abramov",
        number: "12-432-12121",
        id : 3
    },
    {
        name: "Mary Poppendieck",
        number : "39-23-23290",
        id: 4
    }
]

app.get('/',(req,res) =>{
    res.send('<h1>Welcome to Contacts Web App!</h1>')
})

app.get('/api/persons', (req,res) =>{
    res.json(persons)
})

app.get('/api/info', (req,res) =>{
    const numOfPeople = persons.length
    const date = new Date()
    res.send(`<p> Phonebook has info for ${numOfPeople} people </p> <p>${date}</p>`)
})

app.get('/api/persons/:id', (req,res) =>{
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    if(person){
        res.json(person)
    }
    else{
        res.status(404).end()
    }
})


const generateid = () =>{
    return Math.floor((Math.random() * 100) + 1)
}
app.delete('/api/persons/:id', (req,res) =>{
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)

    res.status(204).end()
})

app.post('/api/persons', (req,res) =>{
    const personInput = req.body
  

    if(!personInput.name || !personInput.number){
        return res.status(400).json({
            error: 'content missing'
        })
    }

    const existingPerson = persons.find(person => person.name ===personInput.name)

    if(existingPerson){
        return res.status(400).json({
            error: 'person already exists'
        })
    }
    const personOutput = {
        name : personInput.name,
        number: personInput.number,
        id : generateid()
    }

   persons =  persons.concat(personOutput)
    res.json(personOutput)

})

const unknownEndpoint = (request,response) =>{
    response.status(404).send({error : 'unknown endpoint'})
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})

