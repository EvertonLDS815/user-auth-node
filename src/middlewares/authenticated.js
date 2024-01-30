const jwt = require('jsonwebtoken');
const User = require('../models/auth');

const authenticated = async (req, res, next) => {
    try {
      const token = req.header('Authorization').replace('Bearer ', '');
      const decoded = jwt.verify(token, 'seu-segredo-jwt');
  
      const user = await User.findById(decoded.userId);
  
      if (!user) {
        throw new Error();
      }
  
      req.user = user;
      next();
    } catch (err) {
      res.status(401).json({message: err.message});
    }
  };
  
  module.exports = authenticated;