import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateBookDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsString()
  @IsOptional()
  description?: string;
}
