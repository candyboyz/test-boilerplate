import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto, UpdatePostDto } from './dto';
import { Post as PostModel } from './posts.model';
import { ApiOkResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @ApiOperation({
        summary: 'Создание поста',
    })
    @ApiOkResponse({
        type: PostModel,
    })
    @Post()
    public async create(@Body() dto: CreatePostDto): Promise<PostModel> {
        return this.postsService.create(dto);
    }

    @ApiOperation({
        summary: 'Получение постов',
    })
    @ApiOkResponse({
        type: PostModel,
        isArray: true,
    })
    @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
    @ApiQuery({ name: 'limit', required: false, type: Number, example: 20 })
    @Get()
    public async findAll(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
        @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number
    ): Promise<PostModel[]> {
        return this.postsService.findAll(page, limit);
    }

    @ApiOperation({
        summary: 'Получение поста',
    })
    @ApiOkResponse({
        type: PostModel,
    })
    @Get(':id')
    public async findOne(@Param('id', ParseIntPipe) id: number): Promise<PostModel> {
        return this.postsService.findOne(id);
    }

    @ApiOperation({
        summary: 'Обновление поста',
    })
    @ApiOkResponse({
        type: PostModel,
    })
    @Put(':id')
    public async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePostDto): Promise<PostModel> {
        return this.postsService.update(id, dto);
    }

    @ApiOperation({
        summary: 'Удаление поста',
    })
    @ApiOkResponse({
        type: undefined,
    })
    @Delete(':id')
    public async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.postsService.delete(id);
    }
}

