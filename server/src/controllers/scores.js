const scoresRouter = require("express").Router();
// const date = new Date();

const Score = require("../models/score");
const middleware = require("../utils/middleware");

scoresRouter.get("/api/scores", async (request, response, next) => {
    try {
        const scores = await Score.find({}).populate("user");
        response.json(scores);
    } catch (error) {
        next(error);
    }
});

scoresRouter.post("/api/scores", middleware.userExtractor, async (request, response, next) => {
    try {
        const body = request.body;
        const currentDate = new Date().toISOString(); // Generates the current date and time in ISO 8601 format

        const score = new Score({
            puzzle: body.puzzle,
            seconds: body.seconds,
            dateFinished: currentDate,
            // user: body.user,
            user: request.user._id,
        });

        const savedScore = await score.save();
        response.json(savedScore);
    } catch (error) {
        next(error);
    }
});

// characterLocationsRouter.get("/api/characterLocations/:id", (request, response, next) => {
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

module.exports = scoresRouter;
