const bcrypt = require("bcryptjs");

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
        required: true,
    },
    isBlocked: {
        type: Boolean,
        default: false,
    }
});

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password, 12);
});

const User = mongoose.model("User", userSchema);

const getByEmail = async (email) => {
    return await User.findOne({ email });
};

const create = async (data) => {
    const newUser = new User(data);
    return await newUser.save();
};

const getAll = async () => {
    return await User.find();
};

module.exports = { getByEmail, create, getAll };