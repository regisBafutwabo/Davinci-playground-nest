import { Configuration, OpenAIApi } from 'openai';

const getOpenAiKeyOrThrow = () => {
  const openAiKey = process.env.OPENAI_API_KEY;
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
