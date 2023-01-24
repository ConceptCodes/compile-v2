import { Configuration, OpenAIApi } from "openai";
import { IQuestionAnswerRequest } from "../types/api";

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
};

const model = "text-davinci-003";

const AI = {
  summarize: async (txt: string): Promise<string> => {
    try {
      const response = await openai.createCompletion({
        model,
        prompt: `Summarize this article please\n${txt}`,
        ...config,
      });
      const summary = response.data.choices[0]?.text?.trim() ?? "";
      return summary;
    } catch (err: any) {
      throw new Error(err);
    }
  },
  paraphrase: async (txt: string): Promise<string> => {
    try {
      const response = await openai.createCompletion({
        model,
        prompt: `Paraphrase this article and could you make it smarter:\n${txt}`,
        ...config,
      });
      const result = response.data.choices[0]?.text?.trim() ?? "";
      return result;
    } catch (err: any) {
      throw new Error(err);
    }
  },
  answer: async (args: IQuestionAnswerRequest): Promise<string> => {
    try {
      const response = await openai.createCompletion({
        model,
        prompt: `${args.article}\n${args.chatlog}\nQ: ${args.question}\nA:`,
        ...config,
      });
      const result = response.data.choices[0]?.text?.trim() ?? "";
      return result;
    } catch (err: any) {
      throw new Error(err);
    }
  },
};

export default AI;
