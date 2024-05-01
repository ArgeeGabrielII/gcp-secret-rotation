import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';

import { HealthModule } from './health/health.module';
import { SharedModule } from './shared/shared.module';
import { SecretManagerModule } from './secret-manager/secret-manager.module';
import { JwtTokenModule } from './jwt-token/jwt-token.module';

import { JwtTokenService } from './jwt-token/jwt-token.service';
import { AccessGuard } from './middleware/token-guard';

@Module({
    imports: [HealthModule, SharedModule, SecretManagerModule, JwtTokenModule],
    providers: [
        JwtService,
        JwtTokenService,
        {
            provide: APP_GUARD,
            useClass: AccessGuard,
        },
    ],
})
export class AppModule {}
