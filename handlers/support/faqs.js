const Faq = require('../../models/Faq');

exports.getFaqs = async (req, res) => {
    try {
        const faqs = await Faq.find();
        res.status(200).json(faqs);
    } catch (err) {
        console.error("Error in getFaqs:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};