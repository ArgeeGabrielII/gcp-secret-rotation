import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { SecretManagerService } from './secret-manager.service';
import { IsPrivate } from 'src/decorator/is-private.decorator';
import { GetSecretDto } from './dto/get-secret.dto';
import { UpdSecretDto } from './dto/upd-secret.dto';

@Controller('/v1')
export class SecretManagerController {
    constructor(private svcSecret: SecretManagerService) {}

    @IsPrivate()
    @Get('/secret')
    async getSecrets(@Body() getSecretDto: GetSecretDto) {
        console.log(`[NAMES ARRAY INPUT] ${getSecretDto}`);
        return await this.svcSecret.getSecrets(getSecretDto);
    }

    @IsPrivate()
    @Post('/secret/:name')
    async insertSecret(@Param('name') name: string) {
        console.log();
        return await this.svcSecret.insSecret(name);
    }

    @IsPrivate()
    @Patch('/secret')
    async updateSecret(@Param('name') name: string, @Body() updSecretDto: UpdSecretDto) {
        console.log(updSecretDto);
        return await this.svcSecret.updSecret(name, updSecretDto);
    }
}
