const User = require('../models/auth');

const emailExistsMiddleware = async (req, res, next) => {
  try {
    const { login } = req.body;
    const user = await User.findOne({ login });

    if (user) {
      throw new Error('Login já criado!');
    }

    next();
  } catch (err) {
    return res.status(500).json({ error: err.message});
  }
};

module.exports = emailExistsMiddleware;