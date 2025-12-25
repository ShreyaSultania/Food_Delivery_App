import jwt from 'jsonwebtoken'
const authMiddleware = async (req, res, next) => {
  const token = req.headers.token;
  if (!token) {
    return res.json({
      success: false,
      message: "Unauthorized access,Login Again"
    })
  }
  try {
    const token_decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = token_decoded.id;
    next();
  }
  catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: "Error"
    })
  }
}
export default authMiddleware;