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
    try {
      console.log('HERERERER');
      return this.chatService.respondToChat(chatDto);
    } catch (error) {
      console.log('ERROR', error.message);
      return error.message;
    }
  }
}
