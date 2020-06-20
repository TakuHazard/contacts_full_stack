
const mongoose = require('mongoose')
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true)
const uniqueValidator = require('mongoose-unique-validator')

require('dotenv').config()
const url = process.env.MONGODB_URI

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology : true})
        .then(result =>{
            console.log('connected to MongoDB')
        })
        .catch((error) =>{
            console.log('error connecting to MongoDB', error.message)
        })

const personSchema = new mongoose.Schema({
    name : {type: String, required : true, unique : true},
    phoneNumber: {type: String, required: true}
})

personSchema.plugin(uniqueValidator)

personSchema.set('toJSON',{
    transform:(document, returnedObject) =>{
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)