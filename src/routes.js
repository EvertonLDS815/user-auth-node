const express = require('express');
const router = express.Router();
const User = require('./models/auth');
const bcrypt = require('bcrypt');
const emailExistsMiddleware = require('./middlewares/emailExistsMiddleware');
const jwt = require('jsonwebtoken');
const authenticated = require('./middlewares/authenticated');


router.get('/users/list', async (req, res) => {
  const users = await User.find();

  return res.status(200).json(users);
})
router.post('/register', emailExistsMiddleware, async (req, res) => {
    try {
      const { login, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        login,
        password: hashedPassword
    });
  
      return res.status(201).json(newUser);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

router.post('/login', async (req, res) => {
    try {
      const { login, password } = req.body;
      const user = await User.findOne({ login });
  
      if (!user) {
        throw new Error('Login/password invalid!');
      }
  
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        throw new Error('Login/password invalid!');
      }
  
      const token = jwt.sign(
          { userId: user._id },
          process.env.SECRET_KEY_JWT,
          { expiresIn: '2h' }
      );

      const data = {
        _id: user._id,
        login: user.login,
        password: user.password,
        token
      }
  
      return res.status(200).json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});

router.get('/profile', authenticated, async (req, res) => {
    const { login } = req.user;
    const user = await User.findOne({ login });
    return res.status(200).json(user);
});

module.exports = router;