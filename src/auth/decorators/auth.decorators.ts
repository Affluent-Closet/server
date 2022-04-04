import { applyDecorators, UseGuards } from '@nestjs/common';
import { Role } from 'src/user/entities/user.entity';

/** "ADMIN" | "USER" | "ANY" */
export type AllowedRoles = keyof typeof Role | 'ANY';

export const Auth = (roles: AllowedRoles[]) => applyDecorators(UseGuards());
