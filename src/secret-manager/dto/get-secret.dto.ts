import { ArrayMinSize, IsArray, IsString } from 'class-validator';

export class GetSecretDto {
    @IsArray()
    @IsString({ each: true })
    @ArrayMinSize(1)
    names: string[];
}
