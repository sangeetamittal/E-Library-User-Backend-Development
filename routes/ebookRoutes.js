const express = require('express');
const router = express.Router();

const verifyToken = require('../middleware/verifyToken')
const { query, param } = require('express-validator')

const filterEbooks = require('../handlers/e-books/filterEbooks');
const getEbookDetails = require('../handlers/e-books/getEbookDetails');

//Route to filter and get ebooks
router.get('/filter', verifyToken, [
    query('category').optional().isString().withMessage('Category must be a string'),
    query('tags').optional().isString().withMessage('Tags must be comma-separated string'),
    query('search').optional().isString().withMessage('Search query must be a string')
], filterEbooks);

//Route to get ebook details
router.get('/:ebookid', verifyToken, [
    param('ebookid').isMongoId().withMessage('Invalid ebook ID')
], getEbookDetails);

module.exports = router;