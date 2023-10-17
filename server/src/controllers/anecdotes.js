const anecdotesRouter = require("express").Router();
// const date = new Date();
const Anecdote = require("../models/anecdote");
const middleware = require("../utils/middleware");

// const getTokenFrom = (request) => {
//     console.log("GETTOKENFROM");
//     const authorization = request.get("authorization");
//     console.log(authorization);
//     if (authorization && authorization.startsWith("Bearer ")) {
//         const token = authorization.replace("Bearer ", "");
//         console.log(token);
//         return token;
//     }
//     return null;
// };

// anecdotesRouter.get("/api/anecdotes", (request, response) => {
//     Anecdote.find({}).then((persons) => {
//         response.json(persons);
//     });
// });

anecdotesRouter.get("/api/anecdotes", async (request, response, next) => {
    try {
        const anecdotes = await Anecdote.find({}).populate("user");
        response.json(anecdotes);
    } catch (error) {
        next(error);
    }
});

anecdotesRouter.post("/api/anecdotes", middleware.userExtractor, async (request, response, next) => {
    try {
        const body = request.body;

        if (!body.content) {
            return response.status(400).json({
                error: "content missing",
            });
        }

        const anecdote = new Anecdote({
            content: body.content,
            author: body.author,
            info: body.info,
            votes: body.votes,
            user: request.user._id,
        });

        const savedAnecdote = await anecdote.save();
        response.json(savedAnecdote);
    } catch (error) {
        next(error); //passes any potential exceptions to the error handler middleware
        // console.error("Error:", error);
        // response.status(500).json({ error: "An error occurred while saving the anecdote." });
    }
});

// anecdotesRouter.get("/info", (request, response) => {
//     Person.countDocuments({})
//         .then((count) => {
//             response.send(`<p>Phonebook has info for ${count} people.</p><p>${date}</p>`);
//         })
//         .catch((error) => {
//             response.send(`Error counting documents: ${error}`);
//         });
// });

// anecdotesRouter.get("/api/persons/:id", (request, response, next) => {
//     Person.findById(request.params.id)
//         .then((person) => {
//             if (person) {
//                 response.json(person);
//             } else {
//                 response.status(404).send("<h1>Person not found</h1>");
//             }
//         })
//         .catch((error) => next(error));
// });

// anecdotesRouter.delete("/api/persons/:id", (request, response, next) => {
//     Person.findByIdAndRemove(request.params.id)
//         // eslint-disable-next-line no-unused-vars
//         .then((result) => {
//             response.status(204).end();
//         })
//         .catch((error) => next(error));
// });

// anecdotesRouter.put("/api/persons/:id", (request, response, next) => {
//     const body = request.body;

//     const person = {
//         name: body.name,
//         number: body.number,
//     };

//     Person.findByIdAndUpdate(request.params.id, person, { new: true })
//         .then((updatedPerson) => {
//             response.json(updatedPerson);
//         })
//         .catch((error) => next(error));
// });

module.exports = anecdotesRouter;
