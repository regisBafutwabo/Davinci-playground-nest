import * as crypto from 'crypto';
// TODO: Modify business logic and data logic
import {
  ChatCompletionRequestMessage,
  ChatCompletionRequestMessageRoleEnum,
  ChatCompletionResponseMessage,
  CreateChatCompletionRequest,
  CreateChatCompletionResponse,
  OpenAIApi,
} from 'openai';

import { Injectable } from '@nestjs/common';

import {
  ChatDto,
  ChatMessageDto,
} from './dto';

@Injectable()
export class ChatService {
  constructor(private readonly openApiClient: OpenAIApi) {}

  // Request handling
  private mapChatDtoToPrompt(chatDto: ChatDto): ChatCompletionRequestMessage[] {
    const situationalContext = `You are a therapist. You are very intelligent and brutally honest. You are giving very concise advices to your client.
Your conversation thus far has been:`;
    const chatMessages = chatDto.messages.map((message) => ({
      role:
        message.authorName === 'user'
          ? ChatCompletionRequestMessageRoleEnum.User
          : ChatCompletionRequestMessageRoleEnum.Assistant,
      content: message.content,
    }));
    const languageModelPrompt: ChatCompletionRequestMessage[] = [
      {
        role: ChatCompletionRequestMessageRoleEnum.System,
        content: situationalContext,
      },
      ...chatMessages,
    ];
    return languageModelPrompt;
  }

  private buildRequestFromChat = (
    chatDto: ChatDto,
  ): CreateChatCompletionRequest => {
    const prompt = this.mapChatDtoToPrompt(chatDto);
    const languageModelRequest: CreateChatCompletionRequest = {
      model: 'gpt-3.5-turbo',
      messages: prompt,
      max_tokens: 500,
      temperature: 0.5,
    };
    return languageModelRequest;
  };

  // Response handling

  private getNextMessageOrThrow = (response: CreateChatCompletionResponse) => {
    const languageModelResponse = response.choices[0].message;
    if (!languageModelResponse)
      throw new Error('Cannot get chat dto from language model response.');
    return languageModelResponse;
  };

  private parseResponseIntoChatMessage = (
    languageModelResponse: ChatCompletionResponseMessage,
  ): ChatMessageDto => {
    const { role, content } = languageModelResponse;
    // TODO: AFter connecting to DB change the logic here
    return {
      authorName: role,
      content,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
    };
  };

  private getChatDtoFromLanguageModelResponse(
    chatBeforeResponse: ChatDto,
    response: CreateChatCompletionResponse,
  ): ChatDto {
    const languageModelResponse = this.getNextMessageOrThrow(response);
    const responseAsMessage = this.parseResponseIntoChatMessage(
      languageModelResponse,
    );
    const chatDtoAfterResponse = chatBeforeResponse;
    chatDtoAfterResponse.messages.push(responseAsMessage);
    return chatDtoAfterResponse;
  }

  public async respondToChat(chatDto: ChatDto): Promise<ChatDto> {
    const languageModelRequest = this.buildRequestFromChat(chatDto);

    const languageModelResponse = await this.openApiClient.createChatCompletion(
      languageModelRequest,
    );
    return this.getChatDtoFromLanguageModelResponse(
      chatDto,
      languageModelResponse.data,
    );
  }
}
