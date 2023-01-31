import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class ChatMessageDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsNumber()
  createdAt: number;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsNotEmpty()
  authorName: string;
}
