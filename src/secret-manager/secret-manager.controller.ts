import { Body, Controller, Get } from '@nestjs/common';
import { SecretManagerService } from './secret-manager.service';
import { IsPrivate } from 'src/decorator/is-private.decorator';

@Controller('/v1')
export class SecretManagerController {
    constructor(private svcSecret: SecretManagerService) {}

    @IsPrivate()
    @Get('/secret')
    async loadSecrets(@Body() names: string[]) {
        console.log(`[NAMES ARRAY INPUT] ${names}`);
        return this.svcSecret.getSecrets(names);
    }
}
