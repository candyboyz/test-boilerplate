import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreatePostDto {
    @ApiProperty({ required: true })
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    title: string;

    @ApiProperty({ required: true })
    @IsString()
    @IsNotEmpty()
    @MinLength(10)
    text: string;
}

