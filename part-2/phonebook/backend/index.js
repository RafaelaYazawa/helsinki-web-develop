require("dotenv").config()


const express = require("express")
const Person = require("./models/person")
const app = express()
const morgan = require("morgan")

app.use(express.json())
app.use(express.static("dist"))
morgan.token("body", (req) => {
  return JSON.stringify(req.body)
})

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
)

// unknown URLs
const unknownEndpoint = (request, response) => {
  return response.status(404).send({ error: "unknown endpoint" })
}


// Requests
app.get("/info", (request, response) => {
  Person.find({}).then((p) => {
    response.send(`Phonebook has info for ${p.length} people
      <p>${new Date()}</p>`)
  })
})

app.get("/api/people", (request, response) => {
  Person.find({}).then((p) => {
    response.json(p)
  })
})

app.post("/api/people", (request, response, next) => {
  const body = request.body

  const person = new Person({
    name: body.name,
    number: body.number,
  })


  person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson)
    })
    .catch((error) => next(error))
})

app.get("/api/people/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => next(error))
})

app.put("/api/people/:id", (request, response, next) => {
  const { name, number } = request.body

  Person.findById(request.params.id)
    .then((person) => {
      if (!person) {
        return response.status(404).end()
      }

      person.name = name
      person.number = number

      return person.save().then((updatedPerson) => {
        response.json(updatedPerson)
      })
    })
    .catch((error) => next(error))
})

app.delete("/api/people/:id", (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch((error) => next(error))
})

// Error Handler
const errorHandler = (error, request, response, next) => {
  console.log(error.message)

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" })
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message })
  }

  next()
}
app.use(unknownEndpoint)

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

app.use(errorHandler)