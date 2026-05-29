import { Schema, Prop, SchemaFactory, Virtual } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type CommentDocument = Comment & Document;

@Schema({ timestamps: true })
export class Comment extends Document {
    @ApiProperty({ minimum: 1 })
    @Prop({ required: true, min: 1 })
    public postId: number;

    @ApiProperty({ required: false })
    @Prop({ required: false })
    public text: string;

    @ApiProperty({ minimum: 1, maximum: 5 })
    @Prop({ required: true, min: 1, max: 5 })
    public rating: number;

    @ApiProperty({ minLength: 2, maxLength: 40 })
    @Prop({ required: true, minlength: 2, maxLength: 40 })
    public author: string;

    @ApiProperty()
    public id: string;

    @ApiProperty({ type: Date })
    public createdAt: Date;

    @ApiProperty({ type: Date })
    public updatedAt: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);

