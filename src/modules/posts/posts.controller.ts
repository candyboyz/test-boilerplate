import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto, UpdatePostDto } from './dto';
import { Post as PostModel } from './posts.model';

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @Post()
    public async create(@Body() dto: CreatePostDto): Promise<PostModel> {
        return this.postsService.create(dto);
    }

    @Get()
    public async findAll(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
        @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number
    ): Promise<PostModel[]> {
        return this.postsService.findAll(page, limit);
    }

    @Get(':id')
    public async findOne(@Param('id', ParseIntPipe) id: number): Promise<PostModel> {
        return this.postsService.findOne(id);
    }

    @Put(':id')
    public async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePostDto): Promise<PostModel> {
        return this.postsService.update(id, dto);
    }

    @Delete(':id')
    public async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.postsService.delete(id);
    }
}

