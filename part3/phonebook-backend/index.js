const express = require("express")
const morgan = require("morgan")
const cors = require("cors")

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

let persons = [
    { 
        "id": 1,
        "name": "Arto Hellas", 
        "number": "040-123456"
    },
    { 
        "id": 2,
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
    },
    { 
        "id": 3,
        "name": "Dan Abramov", 
        "number": "12-43-234345"
    },
    { 
        "id": 4,
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
    }
]

app.get("/api/persons", (request, response) => {
    response.json(persons)
})

app.get("/info", (request, response) => {
    response.send(
        `<p>Phonebook has info for ${persons.length} people <p>
        <p> ${new Date()} <p>`
    )
})

app.get("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (!person) {
        response.status(404).end()
    }
    response.json(person)
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
    const nameExist = persons.find((person) => person.name === body.name)
    if (nameExist) {
        return response.status(400).json({
            error: "Error: name must be unique"
        })
    }
    if (!body.number) {
        return response.status(400).json({ 
            error: "Error: the number is missing"
        })
    }
    const newId = generateId(0, 100000)
    const person = {
        id: newId,
        name : body.name,
        number : body.number
    }
    persons = persons.concat(person)
    response.json(person)
})

const generateId = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})