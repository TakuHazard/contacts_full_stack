const express = require('express')
const app = express()
const bodyParser = require('body-parser') 
app.use(express.static('build'))
app.use(bodyParser.json())

const cors = require('cors')
app.use(cors())

var morgan = require('morgan')
app.use(express.json())

const Person = require('./models/person')

morgan.token('person', function(req,res){
    return JSON.stringify(req.body)
})

morgan.token('method', function(req,res){
    return req.method
})


app.use(morgan(':method :url :response-time :person',{
    skip : function(req,res){return req.method !== "POST"}
}))





const logger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
  }
  
  app.use(logger)


// const requestLogger = (request, response, next) =>{
//     console.log('Method: ', request.method)
//     console.log('Path: ', request.path)
//     console.log('Body: ', request.body)
//     console.log('---')
//     next()
// }

// app.use(requestLogger)


app.get('/',(req,res) =>{
    res.send('<h1>Welcome to Contacts Web App!</h1>')
})

app.get('/api/persons', (req,res) =>{
    Person.find({}).then(persons =>{
        res.json(persons)
    })
})

app.get('/api/info', (req,res) =>{
    const numOfPeople = persons.length
    const date = new Date()
    res.send(`<p> Phonebook has info for ${numOfPeople} people </p> <p>${date}</p>`)
})

app.get('/api/persons/:id', (req,res) =>{
    // const id = Number(req.params.id)

    Person.findById(req.params.id)
          .then(result =>{
             console.log("result",result)
             var person = result
             if(person){
                res.json(person)
            }
            else{
                res.status(404).end()
            }
          })
    
})

app.post('/api/persons', (request,response,next) =>{
    const personInput = request.body  
    if(!personInput.name || !personInput.phoneNumber){
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const personOutput = new Person({
        name : personInput.name,
        phoneNumber : personInput.phoneNumber
    })

    personOutput.save()
    .then(savedPerson=>{
      response.json(savedPerson.toJSON())
    })
    .catch(error => {
        console.log(error.message)
        next(error)
    })
})


    // Person.find({name : personInput["name"]}).then(result =>{
    //     var existingPerson = result
   
    //     if(existingPerson.length !== 0){
    //         return res.status(400).json({
    //             error: 'person already exists'
    //         })
    //     }
    //     const personOutput = new Person({
    //         name : personInput.name,
    //         phoneNumber: personInput.phoneNumber,
    //     })

    //     personOutput.save().then(savedPerson =>{
    //         res.json(savedPerson)
    //     }).catch(error => next(error))
    // }).catch(error => next(error))

app.delete('/api/persons/:id', (request, response, next) =>{
    Person.findByIdAndRemove(request.params.id)
          .then(result =>{
              console.log(result)
              response.status(204).end()
          })
          .catch(error => {
               next(error)
          })
})

app.put('/api/persons/:id', (request,response,next) =>{
    const body = request.body

    const person = {
        name : body.name,
        phoneNumber: body.phoneNumber
    }

    Person.findOneAndUpdate({_id: request.params.id},{phoneNumber : person.phoneNumber}, {new : true, runValidators : true})
          .then(updatedPerson =>{
              response.json(updatedPerson)
          })
          .catch(error =>{
             next(error)
          })
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
  app.use(unknownEndpoint)
  
  const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError' && error.kind == 'ObjectId') {
      return response.status(400).send({ error: 'malformatted id' })
    }  else if (error.name === 'ValidationError') {
        console.log(error.name,error.message)
      return response.status(400).json({ error: error.message })
    }
  
    next(error)
  }
  
  app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})

