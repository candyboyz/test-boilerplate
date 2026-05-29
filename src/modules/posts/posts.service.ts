import { Injectable } from '@nestjs/common';
import { PostsRepository } from './posts.repository';
import { CreatePostDto, UpdatePostDto } from './dto';
import { Post } from './posts.model';

@Injectable()
export class PostsService {
    constructor(private readonly postsRepository: PostsRepository) {}

    public async create(dto: CreatePostDto): Promise<Post> {
        return this.postsRepository.createPost(dto);
    }

    public async findAll(page?: number, limit?: number): Promise<Post[]> {
        return this.postsRepository.findAll(page, limit);
    }

    public async findOne(id: number): Promise<Post> {
        return this.postsRepository.findOne(id);
    }

    public async update(id: number, dto: UpdatePostDto): Promise<Post> {
        return this.postsRepository.updatePost(id, dto);
    }

    public async delete(id: number): Promise<void> {
        return this.postsRepository.deletePost(id);
    }
}

