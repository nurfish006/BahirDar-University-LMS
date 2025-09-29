import { expressjwt } from "express-jwt";

export const requireSignin = expressjwt({
  getToken: (req, res) => req.cookies.geTtoken,
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});
