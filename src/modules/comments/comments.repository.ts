import { Injectable } from '@nestjs/common';
import { Comment } from './comments.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CommentsRepository {
    constructor(@InjectModel(Comment.name) private readonly commentModel: Model<Comment>) {}
}

