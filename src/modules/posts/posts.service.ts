import { Injectable } from '@nestjs/common';
import { PostsRepository } from './posts.repository';

@Injectable()
export class PostsService {
    constructor(private readonly postsRepository: PostsRepository) {}

    public async create(): Promise<void> {}

    public async findAll(): Promise<void> {}
}

