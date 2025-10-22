const { validationResult } = require('express-validator');
const User = require('../../models/User');
const Ebook = require('../../models/Ebook');

const addOrUpdateNote = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
        const { ebookId, content } = req.body;
        const user = await User.findById(req.user.id);
        const ebook = await Ebook.findById(ebookId);

        if (!ebook) return res.status(404).json({ message: 'Ebook not found' });

        // Check if note exists
        const existing = user.notes.find(n => n.ebook.toString() === ebookId);
        if (existing) {
            existing.content += `\n${content}`;
        } else {
            user.notes.push({ ebook: ebookId, content });
        }

        await user.save();
        await user.populate('notes.ebook', 'title');

        res.status(200).json({ message: 'Note saved', notes: user.notes });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

const deleteNote = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
        const { ebookId } = req.params;
        const ebook = await Ebook.findById(ebookId);
        if (!ebook) {
            return res.status(404).json({ message: 'Ebook not found' });
        }
        
        const user = await User.findById(req.user.id);

        const noteExists = user.notes.some(n => n.ebook.toString() === ebookId);
        if (!noteExists) return res.status(404).json({ message: 'Note not found' });

        user.notes = user.notes.filter(n => n.ebook.toString() !== ebookId);
        await user.save();

        res.status(200).json({ message: 'Note deleted', notes: user.notes });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

const getNotes = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('notes.ebook', 'title');
        res.status(200).json({ notes: user.notes });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { addOrUpdateNote, deleteNote, getNotes };
