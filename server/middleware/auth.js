import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization").split(" ")[1];
    if (!token) return res.status(403).send("Access Deneid");
    const isCustomToken = token.length < 500;
    let verified;
    if (token && isCustomToken) {
      verified = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = verified?.id;
    } else {
      verified = jwt.decode(token);
      req.userId = verified?.sub;
    }
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default verifyToken;
