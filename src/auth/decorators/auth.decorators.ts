import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { Role } from 'src/user/entities/user.entity';
import { AuthGuard } from '../authGuard';
import { RolesGuard } from '../guards/roles.guard';

/** "ADMIN" | "USER" | "ANY" */
export type AllowedRoles = keyof typeof Role | 'ANY';

export const Auth = (roles: AllowedRoles[]) =>
  applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(AuthGuard, RolesGuard),
  );
