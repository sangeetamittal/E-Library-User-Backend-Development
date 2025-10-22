const User = require('../../models/User');
const { validationResult } = require('express-validator');

const updateMode = async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { darkMode } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { darkMode },
      { new: true }
    );

    res.status(200).json({
      message: 'Mode updated',
      darkMode: user.darkMode
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { updateMode };
