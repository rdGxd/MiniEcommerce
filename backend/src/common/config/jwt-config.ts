import { registerAs } from '@nestjs/config';

export const jwtConfig = registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET,
  signOptions: {
    expiresIn: Number(process.env.JWT_EXPIRES_IN),
    issuer: process.env.JWT_ISSUER,
    audience: process.env.JWT_AUDIENCE,
  },
  refreshToken: process.env.JWT_REFRESH_TOKEN,
  refreshTokenExpiresIn: Number(process.env.JWT_REFRESH_TOKEN_EXPIRES_IN),
}));
