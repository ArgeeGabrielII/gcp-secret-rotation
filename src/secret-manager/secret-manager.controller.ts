import { Body, Controller, Get } from '@nestjs/common';
import { SecretManagerService } from './secret-manager.service';

@Controller('secret-manager')
export class SecretManagerController {
    constructor(private svcSecret: SecretManagerService) {}

    @Get('/')
    async loadSecrets(@Body() names: string[]) {
        console.log(`[NAMES ARRAY INPUT] ${names}`);
        return this.svcSecret.getSecrets(names);
    }
}
