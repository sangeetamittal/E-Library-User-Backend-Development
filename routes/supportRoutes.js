const express = require('express');
const router = express.Router();

const { submitContactRequest } = require('../handlers/support/contactRequest');
const { getFaqs } = require('../handlers/support/faqs');

router.post('/contact', submitContactRequest);
router.get('/faqs', getFaqs);

module.exports = router;