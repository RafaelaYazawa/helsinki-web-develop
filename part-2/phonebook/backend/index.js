require("dotenv").config();

const express = require("express");
const app = express();
const morgan = require("morgan");

const Person = require("./models/person");

app.use(express.json());
app.use(express.static("dist"));
morgan.token("body", (req, res) => {
  return JSON.stringify(req.body);
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

let person = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

// Unkown URLs
const unkownEndpoint = (request, response) => {
  return response.status(404).send({ error: "unkown endpoint" });
};

// Requests
app.get("/info", (request, response) => {
  response.send(
    `<p>Phonebook has info for ${person.length} people</p>
    <p> ${new Date()}</p>`
  );
});

app.get("/api/people", (request, response) => {
  Person.find({}).then((p) => {
    response.json(p);
  });
});

app.post("/api/people", (request, response) => {
  const body = request.body;

  console.log("name", !body.name);

  if (!body.name && !body.number) {
    return response
      .status(400)
      .json({ error: "name or number might be missing" });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});

app.get("/api/people/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => {
      next(error);
    });
});

app.put("/api/people/:id", (request, response, next) => {
  const { name, number } = request.body;

  Person.findById(request.params.id)
    .then((person) => {
      if (!person) {
        return response.status(404).end();
      }

      person.name = name;
      person.number = number;

      return person.save().then((updatedPerson) => {
        response.json(updatedPerson);
      });
    })
    .catch((error) => next(error));
});

app.delete("/api/people/:id", (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then((deletedPerson) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

// Error Handler
const errorHandler = (error, request, response, next) => {
  console.log(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next();
};

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use(unkownEndpoint);
app.use(errorHandler);
