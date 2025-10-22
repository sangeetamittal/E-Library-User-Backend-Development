const Ebook = require('../../models/Ebook');
const { validationResult } = require('express-validator');

const filterEbooks = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    
    try {
        const { category, tags, search } = req.query;

        // Build query dynamically
        let query = {};
        if (category) query.category = category;
        if (tags) query.tags = { $in: tags.split(',') }; // support multiple tags
        if (search) query.title = { $regex: search, $options: 'i' }; // case-insensitive search

        const ebooks = await Ebook.find(query);

        res.status(200).json({ ebooks });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = filterEbooks;
