import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, ValidateNested } from 'class-validator';

import { ChatMessageDto } from './chatMessage.dto';

export class ChatDto {
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ChatMessageDto)
  @ValidateNested({ each: true })
  messages: ChatMessageDto[];
}
