import { IsInt, IsNotEmpty, IsOptional, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';
import { IsValidCommentText } from '../validators/comment-text.validator';

export class CreateCommentDto {
    @IsInt()
    @IsNotEmpty()
    @Min(1)
    postId: number;

    @IsString()
    @IsOptional()
    @IsValidCommentText()
    text?: string;

    @IsInt()
    @Min(1)
    @Max(5)
    rating: number;

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(40)
    author: string;
}

