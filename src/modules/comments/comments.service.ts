import { Injectable } from '@nestjs/common';
import { CommentsRepository } from './comments.repository';
import { CreateCommentDto, UpdateCommentDto } from './dto';
import { Comment } from './comments.model';

@Injectable()
export class CommentsService {
    constructor(private readonly commentsRepository: CommentsRepository) {}

    public async create(dto: CreateCommentDto): Promise<Comment> {
        return this.commentsRepository.createComment(dto);
    }

    public async findAll(page?: number, limit?: number): Promise<Comment[]> {
        return this.commentsRepository.findAll(page, limit);
    }

    public async findAllByPostID(postId: number, page?: number, limit?: number): Promise<Comment[]> {
        return this.commentsRepository.findAllByPostID(postId, page, limit);
    }

    public async findOne(id: string): Promise<Comment> {
        return this.commentsRepository.findOne(id);
    }

    public async update(id: string, dto: UpdateCommentDto): Promise<Comment> {
        return this.commentsRepository.updateComment(id, dto);
    }

    public async delete(id: string): Promise<void> {
        return this.commentsRepository.deleteComment(id);
    }
}

