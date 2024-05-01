import { Body, Controller, Get, Post, Headers } from '@nestjs/common';
import { JwtTokenService } from './jwt-token.service';
import { CreateTokenDto } from './dto/create-token.dto';
import { GetTokenDto } from './dto/get-token.dto';
import { JWTToken, JWTVerify } from './jwt-token.model';
import { IsPublic } from 'src/decorator/is-public.decorator';

@Controller('/ofm')
export class JwtTokenController {
    constructor(private jwtTokenService: JwtTokenService) {}
    @IsPublic()
    @Post('/generate-token')
    getToken(@Body() createTokenDto: CreateTokenDto): JWTToken {
        console.log(`[GENERATE JWT] createTokenDto: ${JSON.stringify(createTokenDto)}`);
        return this.jwtTokenService.generateToken(createTokenDto);
    }
    @IsPublic()
    @Get('/verify-token')
    verifyToken(@Headers() getTokenDto: GetTokenDto): JWTVerify {
        console.log(`[VERIFY JWT] getTokenDto: ${JSON.stringify(getTokenDto)}`);
        return this.jwtTokenService.validateToken(getTokenDto);
    }
}
