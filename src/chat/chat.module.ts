import { Module } from '@nestjs/common';

import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { buildOpenAiClient } from './config';

@Module({
  controllers: [ChatController],
  providers: [
    {
      provide: ChatService,
      useFactory: () => {
        const openAiClient = buildOpenAiClient();
        return new ChatService(openAiClient);
      },
    },
  ],
})
export class ChatModule {}
