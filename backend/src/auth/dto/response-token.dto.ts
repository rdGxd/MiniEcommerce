export class ResponseTokenDto {
  id: string;
  email: string;
  name: string;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  refreshTokenExpiresIn: number;
}
