import { IsNotEmpty, IsString } from 'class-validator';

export class UpdSecretDto {
    @IsNotEmpty()
    @IsString()
    secret_value: string;
}
