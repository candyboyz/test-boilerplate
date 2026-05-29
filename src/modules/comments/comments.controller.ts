import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto, UpdateCommentDto } from './dto';
import { Comment } from './comments.model';

@Controller('comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}

    @Post()
    public async create(@Body() dto: CreateCommentDto): Promise<Comment> {
        return this.commentsService.create(dto);
    }

    @Get()
    public async findAll(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
        @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number
    ): Promise<Comment[]> {
        return this.commentsService.findAll(page, limit);
    }

    @Get('post/:postId')
    public async findAllByPostID(@Param('postId', ParseIntPipe) postId: number): Promise<Comment[]> {
        return this.commentsService.findAllByPostID(postId);
    }

    @Get(':id')
    public async findOne(@Param('id') id: string): Promise<Comment> {
        return this.commentsService.findOne(id);
    }

    @Put(':id')
    public async update(@Param('id') id: string, @Body() dto: UpdateCommentDto): Promise<Comment> {
        return this.commentsService.update(id, dto);
    }

    @Delete(':id')
    public async delete(@Param('id') id: string): Promise<void> {
        return this.commentsService.delete(id);
    }
}

