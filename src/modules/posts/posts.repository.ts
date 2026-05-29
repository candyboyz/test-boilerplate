import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Post } from './posts.model';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto, UpdatePostDto } from './dto';

@Injectable()
export class PostsRepository {
    constructor(
        @InjectRepository(Post)
        private readonly postModel: Repository<Post>
    ) {}

    public async createPost(dto: CreatePostDto): Promise<Post> {
        const post = this.postModel.create(dto);
        return this.postModel.save(post);
    }

    public async findAll(page: number = 1, limit: number = 20): Promise<Post[]> {
        return this.postModel.find({
            skip: (page - 1) * limit,
            take: limit,
            order: { id: 'DESC' },
        });
    }

    public async findOne(id: number): Promise<Post> {
        const post = await this.postModel.findOneBy({ id });

        if (!post) throw new NotFoundException(`Post '${id}' not found`);

        return post;
    }

    public async updatePost(id: number, dto: UpdatePostDto): Promise<Post> {
        const post = await this.postModel.preload({ id, ...dto });

        if (!post) {
            throw new NotFoundException(`Post '${id}' not found`);
        }

        return this.postModel.save(post);
    }

    public async deletePost(id: number): Promise<void> {
        const result = await this.postModel.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException(`Post '${id}' not found`);
        }
    }
}

