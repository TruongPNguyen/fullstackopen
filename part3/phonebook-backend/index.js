require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const Person = require('./models/person')

const app = express()
app.use(express.static("dist"))
app.use(cors())
app.use(express.json())
morgan.token("post", (request) => {
    if (request.method === "POST") {
        return JSON.stringify(request.body)
    }
})

app.use(morgan(":method :url :status :res[content-length] - :response-time ms :post"))

app.get('/api/persons', (request, response) => {
    Person.find({})
        .then(persons => {
        response.json(persons)
        })
})

app.get("/info", (request, response) => {
    response.send(
        `<p>Phonebook has info for ${persons.length} people <p>
        <p> ${new Date()} <p>`
    )
})

app.get("/api/persons/:id", (request, response, next) => {
    const id = request.params.id
    Person.findById(id)
        .then(person => {
            response.json(person)
        })
        .catch(error => next(error))
})

app.delete("/api/persons/:id", (request, response, next) => {
    const id = request.params.id
    Person.findByIdAndRemove(id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.post("/api/persons", (request, response) => {
    const body = request.body
    if (!body.name) {
        return response.status(400).json({ 
            error: "Error: the name is missing" 
        })
    }
    if (!body.number) {
        return response.status(400).json({ 
            error: "Error: the number is missing"
        })
    }

    const person = new Person({
        name : body.name,
        number : body.number
    })
    person.save().then(savedPerson => {
        response.json(savedPerson)
    })
})

app.put("/api/person/:id", (request, response, next) => {
    const body = request.body;
    const id = request.params.id;
    const person = new Person({
        name : body.content,
        number : body.number
    })
    Person.findByIdAndUpdate(id, person, { new : true })
        .then(updatedPerson => {
            response.json(updatedPerson)
        })
        .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error : "unknown endpoint" })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    if (error.name === "CastError") {
        return response.status(400).send({ error : "malformatted id"})
    }
    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})