import { Injectable } from '@nestjs/common';
import { verify, sign } from 'jsonwebtoken';
import { JWTToken, JWTVerify, TokenStatus } from './jwt-token.model';
import { CreateTokenDto } from './dto/create-token.dto';
import { GetTokenDto } from './dto/get-token.dto';

@Injectable()
export class JwtTokenService {
    generateToken(tokenDto: CreateTokenDto): JWTToken {
        const { username, datetime } = tokenDto;
        const jwtSecret = process.env.TOKEN_SECRET;
        const setExpiry = Math.floor(Date.now() / 1000) + 3600; // Token Expires in 1 Hour

        console.log(username, datetime, jwtSecret, setExpiry);

        const token = sign({ username, datetime, exp: setExpiry }, jwtSecret);
        console.log(`[GENERATE JWT] Token: ${token}; status: SUCCESS`);

        return { token, status: TokenStatus.SUCCESS };
    }

    public validateToken(getTokenDto: GetTokenDto): JWTVerify {
        try {
            const { authorization } = getTokenDto;
            const jwtSecret = process.env.TOKEN_SECRET;

            const bToken = authorization.split(' ');
            console.log(bToken[1], jwtSecret);

            const tokenData = verify(bToken[1], jwtSecret);
            console.log(`[VERIFY JWT] TokenData: ${JSON.stringify(tokenData)}`);

            if ((tokenData as any).exp * 1000 > Date.now()) return { valid: true, status: TokenStatus.SUCCESS };

            return { valid: false, status: TokenStatus.FAILURE };
        } catch (error) {
            return { valid: false, status: TokenStatus.FAILURE };
        }
    }
}
