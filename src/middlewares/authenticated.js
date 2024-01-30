const jwt = require('jsonwebtoken');
const User = require('../models/auth');

const authenticated = async (req, res, next) => {
    try {
      const token = req.header('Authorization').replace('Bearer ', '');
      const decoded = jwt.verify(token, process.env.SECRET_KEY_JWT);
  
      const user = await User.findById(decoded.userId);
  
      if (!user) {
        throw new Error('Não existe esse teco teco!');
      }
  
      req.user = user;
      next();
    } catch (err) {
      res.status(401).json({message: err.message});
    }
  };
  
  module.exports = authenticated;