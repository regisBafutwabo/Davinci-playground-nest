import { ChatDto } from 'src/chat/dto/chat.dto';
import * as request from 'supertest';

import { INestApplication } from '@nestjs/common';
import {
  Test,
  TestingModule,
} from '@nestjs/testing';

import { AppModule } from '../src/app.module';

describe('ChatController (e2e)', () => {
  let app: INestApplication;

  const setupNestInfrastructure = async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  };

  beforeEach(async () => {
    await setupNestInfrastructure();
  });

  let chatResult: ChatDto;

  const aChat = (): ChatDto => ({
    messages: [
      {
        authorName: 'assistant',
        content: 'Hi, how are you?',
        createdAt: new Date().getTime(),
        id: '4e6a8e0a-5b51-4330-8356-572d51970e37',
      },
      {
        authorName: 'user',
        content: 'Good.',
        createdAt: new Date().getTime() + 1,
        id: '4e6a8e0a-5b51-4330-8356-572d51970e38',
      },
    ],
  });

  const getResponseToChat = async (chat: ChatDto) => {
    const chatResponse = await request(app.getHttpServer())
      .post('/chat/respond')
      .send(chat);
    chatResult = chatResponse.body;
  };

  const verifyChatWasUpdated = async () => {
    expect(chatResult.messages).toHaveLength(3);
    const lastMessage = chatResult.messages[2];
    expect(lastMessage.authorName).toEqual('therapist');
    expect(typeof lastMessage.content).toBe('string');
  };

  it('responds to a chat', async () => {
    const chat = aChat();

    await getResponseToChat(chat);

    verifyChatWasUpdated();
  });
});
