const Feedback = require('../../models/Feedback');

exports.submitFeedback = async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) return res.status(400).json({ message: "Message is required" });

        const feedback = await Feedback.create({
            userId: req.user.id,
            message
        });

        res.status(201).json({ message: "Feedback submitted successfully", feedback });
    } catch (err) {
        console.error("Error in submitFeedback:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};