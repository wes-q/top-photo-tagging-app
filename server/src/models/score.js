const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema({
    puzzle: {
        type: String,
        required: true,
    },
    seconds: {
        type: Number,
        required: true,
    },
    dateFinished: {
        type: Date,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

scoreSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

module.exports = mongoose.model("Score", scoreSchema);
