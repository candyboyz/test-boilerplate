import { IsInt, IsNotEmpty, IsOptional, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';
import { IsValidCommentText } from '../validators/comment-text.validator';

export class UpdateCommentDto {
    @IsInt()
    @IsOptional()
    @Min(1)
    postId?: number;

    @IsString()
    @IsOptional()
    @IsValidCommentText()
    text?: string;

    @IsInt()
    @IsOptional()
    @Min(1)
    @Max(5)
    rating?: number;

    @IsString()
    @IsOptional()
    @MinLength(2)
    @MaxLength(40)
    author?: string;
}

