import { Module } from '@nestjs/common';
import { SecretManagerService } from './secret-manager.service';
import { SecretManagerController } from './secret-manager.controller';

@Module({
    providers: [SecretManagerService],
    controllers: [SecretManagerController],
    exports: [SecretManagerService],
})
export class SecretManagerModule {}
