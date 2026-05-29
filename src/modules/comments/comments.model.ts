import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Comment {
    @Prop({ required: true })
    public postId: number;

    @Prop({ required: false })
    public text: string;

    @Prop({ required: true })
    public rating: number;

    @Prop({ required: true })
    public author: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);

