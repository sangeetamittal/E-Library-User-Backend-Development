const Ebook = require('../../models/Ebook');
const { validationResult } = require('express-validator');

const getEbookDetails = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
        const { ebookid } = req.params;
        const ebook = await Ebook.findById(ebookid);
        if (!ebook) return res.status(404).json({ message: 'Ebook not found' });

        res.status(200).json({ ebook });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = getEbookDetails;
