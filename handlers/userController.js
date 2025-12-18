const { getAll } = require("../pkg/user/userSchema");

exports.getUsers = async (req, res) => {
    try {
        console.log("req.auth", req.auth);
        
        if (req.auth.role === "admin") {
            const users = await getAll();
            return res.status(200).json(users);
        } else {
            return res.status(403).json({error: "Forbidden!"});
        }
    } catch (err) {
        return req.status(500).json({
            error: err.message,
        });
    }
};