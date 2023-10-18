const mongoose = require("mongoose");

const characterLocationSchema = new mongoose.Schema({
    puzzle: {
        type: String,
        required: true,
    },
    charName: {
        type: String,
        required: true,
    },
    xMin: Number,
    xMax: Number,
    yMin: Number,
    yMax: Number,
    imageSrc: String,
});

characterLocationSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

module.exports = mongoose.model("CharacterLocation", characterLocationSchema, "character_locations");
