import { IsInt, IsNotEmpty, IsOptional, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';

export class UpdateCommentDto {
    @IsInt()
    @IsOptional()
    @Min(1)
    postId?: number;

    @IsString()
    @IsOptional()
    @MinLength(1)
    @MaxLength(1000)
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

