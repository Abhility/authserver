const jwt = require('jsonwebtoken');

const generateToken = (data) => {
  return jwt.sign({ subject: data }, process.env.SECRET_KEY);
};

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    // if header not present
    return res.status(401).json({ message: 'Unauthorized request' });

  const token = authHeader.split(' ')[1];

  // if token is empty
  if (!token) return res.status(401).json({ message: 'Unauthorized request' });

  const data = getPayloadFromToken(token);
  if (data === null)
    return res.status(401).json({ message: 'Unauthorized request' });

  req.userId = data.subject;
  next();
};

const getPayloadFromToken = (token) => {
  try {
    return jwt.verify(token, process.env.SECRET_KEY);
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports.generateToken = generateToken;
module.exports.verifyToken = verifyToken;
module.exports.getPayloadFromToken = getPayloadFromToken;
