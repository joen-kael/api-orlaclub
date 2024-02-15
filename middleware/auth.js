const { verifyToken } = require("../utils/auth");
const AuthService = require("../modules/auth/service");

const authenticate = async (
  req,
  res,
  next
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const decodedToken = verifyToken(token);

  if (!decodedToken) {
    return res.status(401).json({ message: "Invalid token" });
  }

  const valid = await AuthService.config().retrieve(token);
  if (!valid) {
    return res.status(401).json({ message: "Invalid token" });
  }

  next();
};

module.exports =  authenticate;
