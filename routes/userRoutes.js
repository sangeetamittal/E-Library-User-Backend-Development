const express = require('express');
const router = express.Router();

const verifyToken = require('../middleware/verifyToken');
const { check, param } = require('express-validator');

const { getBookmarks, addOrUpdateBookmark, removeBookmark } = require('../handlers/user/bookmarks');
const { updateMode } = require('../handlers/user/profile');
const { addOrUpdateNote, deleteNote, getNotes } = require('../handlers/user/notes');

// Update user mode preferences
router.put('/preferences', [
    check('darkMode').isBoolean().withMessage('Darkmode must be true or false'),
], verifyToken, updateMode);

// Get user bookmarks
router.get('/bookmarks', verifyToken, getBookmarks);

// Add or update a bookmark
router.post('/bookmarks', [
    check('ebookId').isMongoId().withMessage('Valid ebookId is required'),
    check('page').optional().isInt({ min: 1 }).withMessage('Page must be a non-negative integer'),
], verifyToken, addOrUpdateBookmark);

// Remove a bookmark
router.delete('/bookmarks/:ebookId', [
    param('ebookId').isMongoId().withMessage('Valid ebookId is required'),
], verifyToken, removeBookmark);

// Get user notes
router.get('/notes', verifyToken, getNotes);

// Add or update a note
router.post('/notes', [
    check('ebookId').isMongoId().withMessage('Valid ebookId is required'),
    check('content').notEmpty().withMessage('Note content cannot be empty')
], verifyToken, addOrUpdateNote);

// Delete a note
router.delete('/notes/:ebookId', [
    param('ebookId').isMongoId().withMessage('Valid ebookId is required')
], verifyToken, deleteNote);

module.exports = router;