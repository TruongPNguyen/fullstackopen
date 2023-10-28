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
    Person
        .find({})
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

app.get("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id)
    Person.findById(id).then(person => {
        response.json(person)
    })
})

app.delete("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

app.post("/api/persons", (request, response) => {
    const body = request.body
    if (!body.name) {
        return response.status(400).json({ 
            error: "Error: the name is missing" 
        })
    }
    /* const nameExist = persons.find((person) => person.name === body.name)
    if (nameExist) {
        return response.status(400).json({
            error: "Error: name must be unique"
        })
    } */
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

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})