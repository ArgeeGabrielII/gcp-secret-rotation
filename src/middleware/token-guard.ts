import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { JwtTokenService } from '../jwt-token/jwt-token.service';

@Injectable()
export class AccessGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        private svcToken: JwtTokenService,
    ) {}

    canActivate(context: ExecutionContext): boolean {
        // Check if IsPublic is used in api
        const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler());
        if (isPublic) return true;

        const request = context.switchToHttp().getRequest<Request>();
        console.log(`[GUARD] Request Headers: ${JSON.stringify(request.headers)}`);
        const bToken = request.headers.authorization.split(' ');
        const token = bToken[1];
        console.log(`[GUARD] Token: ${token}`);

        if (!token) return false;

        try {
            const decoded = this.svcToken.validateToken({
                authorization: request.headers.authorization,
            });
            // request['user'] = decoded; // Attach the decoded user object to the request
            console.log(`[GUARD] [VALIDATE] Decoded: ${JSON.stringify(decoded)}`);

            if (decoded.valid) return true;

            throw new UnauthorizedException('Unauthorized', {
                cause: new Error(),
                description: 'Token is invalid.',
            });
        } catch (error) {
            return false;
        }
    }
}
