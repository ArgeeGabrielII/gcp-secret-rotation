import { Body, Controller, Get, Post, Headers } from '@nestjs/common';
import { JwtTokenService } from './jwt-token.service';
import { CreateTokenDto } from './dto/create-token.dto';
import { GetTokenDto } from './dto/get-token.dto';
import { JWTToken, JWTVerify } from './jwt-token.model';

@Controller('/v1')
export class JwtTokenController {
    constructor(private svcJWTToken: JwtTokenService) {}

    @Post('/token/generate')
    getToken(@Body() createTokenDto: CreateTokenDto): JWTToken {
        console.log(`[GENERATE JWT] createTokenDto: ${JSON.stringify(createTokenDto)}`);
        return this.svcJWTToken.generateToken(createTokenDto);
    }

    @Get('/token/verify')
    verifyToken(@Headers() getTokenDto: GetTokenDto): JWTVerify {
        console.log(`[VERIFY JWT] getTokenDto: ${JSON.stringify(getTokenDto)}`);
        return this.svcJWTToken.validateToken(getTokenDto);
    }
}
