import { Injectable, NotFoundException } from '@nestjs/common';
import { Comment } from './comments.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCommentDto, UpdateCommentDto } from './dto';

@Injectable()
export class CommentsRepository {
    constructor(@InjectModel(Comment.name) private readonly commentModel: Model<Comment>) {}

    public async createComment(dto: CreateCommentDto): Promise<Comment> {
        const comment = new this.commentModel(dto);
        return comment.save();
    }

    public async findAll(page: number = 1, limit: number = 20): Promise<Comment[]> {
        return this.commentModel
            .find()
            .lean()
            .skip((page - 1) * limit)
            .limit(limit)
            .exec();
    }

    public async findAllByPostID(postId: number, page: number = 1, limit: number = 20): Promise<Comment[]> {
        return this.commentModel
            .find({ postId })
            .lean()
            .skip((page - 1) * limit)
            .limit(limit)
            .exec();
    }

    public async findOne(id: string): Promise<Comment> {
        const comment = await this.commentModel.findById(id).lean().exec();

        if (!comment) throw new NotFoundException(`Comment '${id}' not found`);

        return comment;
    }

    public async updateComment(id: string, dto: UpdateCommentDto): Promise<Comment> {
        const comment = await this.commentModel.findByIdAndUpdate(id, dto, { new: true }).lean().exec();

        if (!comment) throw new NotFoundException(`Comment '${id}' not found`);

        return comment;
    }

    public async deleteComment(id: string): Promise<void> {
        const comment = await this.commentModel.findByIdAndDelete(id).lean().exec();

        if (!comment) throw new NotFoundException(`Comment '${id}' not found`);
    }
}

