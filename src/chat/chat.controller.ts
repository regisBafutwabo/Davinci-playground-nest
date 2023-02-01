import {
  Body,
  Controller,
  Injectable,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { ChatService } from './chat.service';
import { ChatDto } from './dto';

@Injectable()
@Controller('chat')
@UsePipes(new ValidationPipe({ transform: true }))
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('/respond')
  respond(@Body() chatDto: ChatDto): Promise<ChatDto> {
    return this.chatService.respondToChat(chatDto);
  }
}
