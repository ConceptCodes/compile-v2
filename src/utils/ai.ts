import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const config = {
  temperature: 0.7,
  max_tokens: 2000,
  top_p: 1,
  frequency_penalty: 0.5,
  presence_penalty: 0.1,
}

const AI = {
  summarize: async (txt: string): Promise<string> => {
    try {
      const response = await openai.createCompletion({
        model: "text-davinci-002",
        prompt: `Summarize this for a middle school student:\n\n${txt}`,
        ...config
      });
      const summary = response.data.choices[0]?.text?.trim() ?? '';
      return summary;
    } catch (err: any) {
      throw new Error(err);
    }
  },
   paraphrase: async (txt: string): Promise<string> => {
    return txt;
  }
}

export default AI;
