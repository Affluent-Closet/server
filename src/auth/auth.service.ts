import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';

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
    // const token = this.
  }

  verify(jwtString: string) {
    try {
      const payload = jwt.verify(jwtString, process.env.JWT_SECRET) as (
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
