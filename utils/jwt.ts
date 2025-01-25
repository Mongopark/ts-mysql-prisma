import jwt from "jsonwebtoken";
import { configs } from "config/app.config";

interface JwtPayload {
  id: String;
  userName?: string | null;
  email?: string | null;
  phoneNumber?: string | null;
  name?: string | null;
}

// set to 10minutes
// const JWT_EXPIRY_TIME = 60 * 10;
const JWT_EXPIRY_TIME = "24h";

export const generateAccessToken = (jwtPayload: JwtPayload) => {
  const token = jwt.sign(jwtPayload, `${configs.JWT_AUTH_SECRET}`, {
    expiresIn: JWT_EXPIRY_TIME,
  });

  return token;
};

// export const generateRefreshToken = (jwtPayload: JwtPayload) => {
//   const refreshToken = jwt.sign(jwtPayload, `${configs.REFRESH_TOKEN_SECRET}`, {
//     expiresIn: "1y",
//   });

//   return refreshToken;
// };
