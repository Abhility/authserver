const jwt = require('jsonwebtoken');

const generateToken = (data) => {
  return jwt.sign({ subject: data }, process.env.SECRET_KEY);
};

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).json({ message: 'Unauthorized request' });

  const token = authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Unauthorized request' });

  try {
    const data = jwt.verify(token, process.env.SECRET_KEY);
    req.userId = data.subject;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: 'Unauthorized request' });
  }
};

const get

module.exports.generateToken = generateToken;
module.exports.verifyToken = verifyToken;
