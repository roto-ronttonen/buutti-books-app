import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateBookDto } from 'src/dtos/book/create-book-dto';
import { DeleteBookParams } from 'src/dtos/book/delete-book-params';
import { FindBookParams } from 'src/dtos/book/find-book-params';
import { UpdateBookDto } from 'src/dtos/book/update-book-dto';
import { UpdateBookParams } from 'src/dtos/book/update-book-params';
import { Book } from 'src/schemas/book.schema';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Post()
  async create(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return this.booksService.create(createBookDto);
  }
  @Put(':id')
  async update(
    @Param() { id }: UpdateBookParams,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<Book> {
    return this.booksService.update(id, updateBookDto);
  }

  @Delete(':id')
  async delete(@Param() { id }: DeleteBookParams): Promise<Book> {
    return this.booksService.delete(id);
  }

  @Get()
  async findAll(): Promise<Book[]> {
    return this.booksService.findAll();
  }
  @Get(':id')
  async findOne(@Param() { id }: FindBookParams): Promise<Book> {
    return this.booksService.findById(id);
  }
}
