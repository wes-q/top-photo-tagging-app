const characterLocationsRouter = require("express").Router();
// const date = new Date();
const CharacterLocation = require("../models/characterLocation");
// const middleware = require("../utils/middleware");

characterLocationsRouter.get("/api/characterLocations", async (request, response, next) => {
    try {
        const characterLocations = await CharacterLocation.find({});
        response.json(characterLocations);
    } catch (error) {
        next(error);
    }
});

characterLocationsRouter.post("/api/characterLocations", async (request, response, next) => {
    try {
        const body = request.body;

        // if (!body.puzzle) {
        //     return response.status(400).json({
        //         error: "puzzle required",
        //     });
        // }

        const characterLocation = new CharacterLocation({
            puzzle: body.puzzle,
            charName: body.charName,
            xMin: body.xMin,
            xMax: body.xMax,
            yMin: body.yMin,
            yMax: body.yMax,
        });

        const savedCharacterLocation = await characterLocation.save();
        response.json(savedCharacterLocation);
    } catch (error) {
        next(error); //passes any potential exceptions to the error handler middleware
        // console.error("Error:", error);
        // response.status(500).json({ error: "An error occurred while saving the anecdote." });
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

module.exports = characterLocationsRouter;
