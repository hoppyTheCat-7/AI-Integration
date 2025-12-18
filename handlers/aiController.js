const { chatWithAI } = require("./aiSystem");

// TODO: Use this handler to test that Cohere is working
const handleChatRequest = async (req, res) => {
    try {
        const { prompt } = req.body;

        console.log(prompt);

        if (!prompt) {
            return res.status(400).json({
                success: false,
                error: "Prompt is required!",
            });
        }

        const result = await chatWithAI(prompt);

        if (result.success) {
            res.status(200).json({
                success: true,
                answer: result.answer,
            });
        } else {
            res.status(500).json({
                success: false,
                error: "Our AI is currently out of work, please try in 5 minutes!",
            });
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: "Internal Server Error!",
        });
    }
};

module.exports = { handleChatRequest };