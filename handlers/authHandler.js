const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { create, getByEmail } = require("../pkg/user/userSchema");

exports.signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const newUser = await create({
            name,
            email,
            password,
            role,
        });

        return res.status(200).json({ status: "success", data: { user: newUser } });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res
                .status(400)
                .json({ error: "Please provide email or password!" });
        }

        const user = await getByEmail(email);

        if (!user) {
            return res.status(404).json({ error: "User not found!" });
        }

        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid password!" });
        }

        const token = jwt.sign(
            {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES,
            }
        );

        return res.status(200).json({ status: "success", token });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};