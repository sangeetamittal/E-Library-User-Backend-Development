const ContactRequest = require('../../models/ContactRequest');

exports.submitContactRequest = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !subject || !message)
            return res.status(400).json({ message: "All fields are required" });

        const contact = await ContactRequest.create({ name, email, subject, message });
        res.status(201).json({ message: "Contact request submitted successfully", contact });
    } catch (err) {
        console.error("Error in submitContactRequest:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};