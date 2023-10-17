const mongoose = require("mongoose");

const anecdoteSchema = new mongoose.Schema({
    content: {
        type: String,
        minLength: 3,
        required: true,
    },
    author: {
        type: String,
    },
    info: {
        type: String,
    },
    votes: {
        type: Number,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
});

anecdoteSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

module.exports = mongoose.model("Anecdote", anecdoteSchema);
