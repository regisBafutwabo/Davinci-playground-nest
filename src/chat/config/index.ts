import { Configuration, OpenAIApi } from 'openai';

import { ConfigService } from '@nestjs/config';

const getOpenAiKeyOrThrow = () => {
  const key = new ConfigService().get('OPENAI_API_KEY');
  const openAiKey = key;
  if (!openAiKey) {
    throw new Error('OpenAI API key not specified');
  }
  return openAiKey;
};

export const buildOpenAiClient = () => {
  const openAiKey = getOpenAiKeyOrThrow();
  const configuration = new Configuration({
    apiKey: openAiKey,
  });
  const openAiClient = new OpenAIApi(configuration);
  return openAiClient;
};
