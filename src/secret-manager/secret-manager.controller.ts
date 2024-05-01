import { Body, Controller, Get } from '@nestjs/common';
import { SecretManagerService } from './secret-manager.service';

@Controller('/v1')
export class SecretManagerController {
    constructor(private svcSecret: SecretManagerService) {}

    @Get('/secret')
    async loadSecrets(@Body() names: string[]) {
        console.log(`[NAMES ARRAY INPUT] ${names}`);
        return this.svcSecret.getSecrets(names);
    }
}
