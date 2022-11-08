const mongoose = require("mongoose")
const Schema = mongoose.Schema
const encryption = require("../middleware/encryption")

const userSchema = new Schema(
    {
        name: { type: String, trim: true, required: true },
        email: { type: String, trim: true, lowercase: true, required: true },
        password: { type: String, get: encryption.decrypt, set: encryption.encrypt },
        age: { type: Number },
        createdAt: { type: Date, default: Date.now() },
        updatedAt: { type: Date, default: Date.now() }
    },
    )
    userSchema.set('toObject', { getters: true });
    userSchema.set('toJSON', { getters: true });
    
const User = mongoose.model("User", userSchema)
module.exports = User