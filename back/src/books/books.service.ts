import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBookDto } from 'src/dtos/book/create-book-dto';
import { UpdateBookDto } from 'src/dtos/book/update-book-dto';
import { Book, BookDocument } from 'src/schemas/book.schema';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const newBook = new this.bookModel(createBookDto);
    return newBook.save();
  }

  async update(id: string, updateBookDto: UpdateBookDto): Promise<Book> {
    const book = await this.bookModel.findById(id).exec();
    if (!book) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    book.name = updateBookDto.name;
    book.author = updateBookDto.author;
    book.description = updateBookDto.description;
    return book.save();
  }

  async delete(id: string): Promise<Book> {
    const book = await this.bookModel.findById(id).exec();
    if (!book) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return this.bookModel.findByIdAndDelete(id).exec();
  }

  async findAll(): Promise<Book[]> {
    return this.bookModel.find().exec();
  }
  async findById(id: string): Promise<Book> {
    const book = await this.bookModel.findById(id).exec();
    if (!book) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return book;
  }
}
