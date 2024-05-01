import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { SharedModule } from './shared/shared.module';
import { SecretManagerModule } from './secret-manager/secret-manager.module';
import { JwtTokenModule } from './jwt-token/jwt-token.module';

@Module({
    imports: [HealthModule, SharedModule, SecretManagerModule, JwtTokenModule],
})
export class AppModule {}
