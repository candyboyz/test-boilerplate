import { IsInt, IsNotEmpty, IsOptional, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';
import { IsValidCommentText } from '../validators/comment-text.validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCommentDto {
    @ApiProperty({ required: false })
    @IsInt()
    @IsOptional()
    @Min(1)
    postId?: number;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    @IsValidCommentText()
    text?: string;

    @ApiProperty({ required: false })
    @IsInt()
    @IsOptional()
    @Min(1)
    @Max(5)
    rating?: number;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    @MinLength(2)
    @MaxLength(40)
    author?: string;
}

