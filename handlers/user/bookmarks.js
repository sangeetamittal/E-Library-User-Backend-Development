const User = require('../../models/User');
const Ebook = require('../../models/Ebook');
const { validationResult } = require('express-validator');

const addOrUpdateBookmark = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { ebookId, page } = req.body;

        // Fetch ebook to check number of pages
        const ebook = await Ebook.findById(ebookId);
        if (!ebook) {
            return res.status(404).json({ message: 'Ebook not found' });
        }

        if (page > ebook.numberOfPages) {
            return res.status(400).json({ message: `Page must be less than or equal to ${ebook.numberOfPages}` });
        }

        const user = await User.findById(req.user.id);

        // Check if bookmark exists
        const existing = user.bookmarks.find(
            b => b.ebook.toString() === ebookId
        );

        if (existing) {
            existing.page = page;
        } else {
            user.bookmarks.push({ ebook: ebookId, page });
        }

        await user.save();

        // Populate ebook title for response
        await user.populate('bookmarks.ebook', 'title');

        res.status(200).json({
            message: 'Bookmark saved',
            bookmarks: user.bookmarks
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

const removeBookmark = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { ebookId } = req.params;

        const ebook = await Ebook.findById(ebookId);
        if (!ebook) {
            return res.status(404).json({ message: 'Ebook not found' });
        }
        
        const user = await User.findById(req.user.id);

        user.bookmarks = user.bookmarks.filter(
            b => b.ebook.toString() !== ebookId
        );

        await user.save();
        await user.populate('bookmarks.ebook', 'title');

        res.status(200).json({
            message: 'Bookmark removed',
            bookmarks: user.bookmarks
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

const getBookmarks = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
            .populate('bookmarks.ebook', 'title');

        res.status(200).json({ bookmarks: user.bookmarks });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { addOrUpdateBookmark, removeBookmark, getBookmarks };
