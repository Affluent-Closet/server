import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  private validateRequest(request: Request) {
    //헤더에서 JWT를 파싱합니다.
    const jwtString = request.headers.authorization.split('Bearer ')[1];
    //JWT가 서버에서 발급한 것인지 검증합니다.
    this.authService.verify(jwtString);

    return true;
  }
}
