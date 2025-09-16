import jwt from 'jsonwebtoken';
import User from '../models/userModels.js';   // ✅ capitalized correctly
import asyncHandler from './asyncHandler.js';

const authenticate = asyncHandler(async (req, res, next) => {
  let token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select('-password'); // ✅ use lowercase
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
  
});

const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {   // ✅ check isAdmin, not .next
    next();
  } else {
    res.status(401).send("Not authorized as an admin");
  }
};

export { authenticate, authorizeAdmin };
