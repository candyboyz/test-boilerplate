import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto, UpdateCommentDto } from './dto';
import { Comment } from './comments.model';
import { ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}

    @ApiOperation({
        summary: 'Создание комментария',
    })
    @ApiOkResponse({
        type: Comment,
    })
    @Post()
    public async create(@Body() dto: CreateCommentDto): Promise<Comment> {
        return this.commentsService.create(dto);
    }

    @ApiOperation({
        summary: 'Получить все комментарии',
    })
    @ApiOkResponse({
        type: Comment,
        isArray: true,
    })
    @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
    @ApiQuery({ name: 'limit', required: false, type: Number, example: 20 })
    @Get()
    public async findAll(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
        @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number
    ): Promise<Comment[]> {
        return this.commentsService.findAll(page, limit);
    }

    @ApiOperation({
        summary: 'Получить все комментарии по ID поста',
    })
    @ApiOkResponse({
        type: Comment,
        isArray: true,
    })
    @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
    @ApiQuery({ name: 'limit', required: false, type: Number, example: 20 })
    @Get('post/:postId')
    public async findAllByPostID(
        @Param('postId', ParseIntPipe) postId: number,
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
        @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number
    ): Promise<Comment[]> {
        return this.commentsService.findAllByPostID(postId, page, limit);
    }

    @ApiOperation({
        summary: 'Получить комментарий по ID',
    })
    @ApiOkResponse({
        type: Comment,
    })
    @Get(':id')
    public async findOne(@Param('id') id: string): Promise<Comment> {
        return this.commentsService.findOne(id);
    }

    @ApiOperation({
        summary: 'Обновить комментарий',
    })
    @ApiOkResponse({
        type: Comment,
    })
    @Put(':id')
    public async update(@Param('id') id: string, @Body() dto: UpdateCommentDto): Promise<Comment> {
        return this.commentsService.update(id, dto);
    }

    @ApiOperation({
        summary: 'Удалить комментарий',
    })
    @ApiOkResponse({
        type: undefined,
    })
    @Delete(':id')
    public async delete(@Param('id') id: string): Promise<void> {
        return this.commentsService.delete(id);
    }
}

