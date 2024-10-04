import { asyncHandler } from "../../error/asyncHandler.error.js";


export const directLogin = asyncHandler(async (req, res, next) => {
  const token = req.query.token;
  const option = {
    expiresIn : new Date(Date.now() + process.env.JWT_EXPIRY * 60 * 60 * 1000),
    httpOnly: true,
    sameSite: 'None',
  };
  res.json({
    success: true,
    message: 'User logged in successfully',
    data: req.user,
  });
});