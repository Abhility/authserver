const router = require('express').Router();
const User = require('../models/User');
const { hashPassword, verifyPassword } = require('../utils/password');
const { generateToken, verifyToken } = require('../utils/jwt');

router.post('/register', async (req, res) => {
  const data = req.body;
  try {
    data.password = await hashPassword(data.password);
    let user = new User(data);
    user = await user.save();
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const match = await verifyPassword(password, user.password);
      if (match) {
        return res.status(200).send({ usertoken: generateToken(user._id) });
      } else {
        return res.status(400).send({ message: 'Invalid password' });
      }
    }
    return res.status(404).json({ message: 'Email not found' });
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get('/protected', verifyToken, (req, res) => {
  res.send('protected route');
});

module.exports = router;
