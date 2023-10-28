const mongoose = require("mongoose")

if (process.argv.length < 3) {
    console.log("give passsword as argument")
    process.exit()
}

const password = process.argv[2]
const url = 
    `mongodb+srv://truong:${password}@cluster0.bt0sbn0.mongodb.net/personApp?retryWrites=true&w=majority`

mongoose.set("strictQuery", false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name : String,
    number : String, 
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length == 3) {
    Person
        .find({})
        .then(persons => {
            console.log("Phonebook: ")
            persons.forEach(person => {
                console.log(person.name, person.number)
            })
            mongoose.connection.close()
        })
}
if (process.argv.length > 4) {
    const name = process.argv[3]
    const number = process.argv[4]
    const person = new Person({
        name : name,
        number : number
    })
    person.save().then(result => {
        console.log(`Added name: ${name} number: ${number}, to the phonebook`)
        mongoose.connection.close()
    })
}