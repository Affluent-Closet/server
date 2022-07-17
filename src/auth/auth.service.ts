import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';
import { env } from 'process';

interface User {
  id: string;
  name: string;
  email: string;
}

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  getCookieWithJwtAccessToken(user: User) {
    const payload = { ...user };

    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1d',
      audience: 'AffluentCloset',
      issuer: 'AffluentCloset',
    });
  }

  getCookieWithJwtRefreshToken(user: User) {
    const payload = { ...user };
    const token = this.jwtService.sign(payload, {
      secret: env.JWT_REFRESH_TOKEN_SECRET,
      expiresIn: env.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
    });

    return {
      refreshToken: token,
      domain: 'localhost',
      path: '/',
      httpOnly: true,
      maxAge: Number(env.JWT_REFRESH_TOKEN_EXPIRATION_TIME) * 1000,
    };
  }

  verify(accessToken: string) {
    try {
      const payload = jwt.verify(accessToken, process.env.JWT_SECRET) as (
        | jwt.JwtPayload
        | string
      ) &
        User;

      const { id, email } = payload;

      return {
        userId: id,
        email,
      };
    } catch (e) {
      throw new UnauthorizedException(e);
    }
  }
}
