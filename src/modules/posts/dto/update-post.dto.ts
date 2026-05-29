import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdatePostDto {
    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    @MinLength(3)
    title?: string;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    @MinLength(10)
    text?: string;
}

