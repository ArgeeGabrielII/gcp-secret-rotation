import { IsNotEmpty, IsString } from 'class-validator';

export class GetTokenDto {
    @IsNotEmpty()
    @IsString()
    authorization: string;
}
