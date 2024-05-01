import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTokenDto {
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    datetime: string;
}
