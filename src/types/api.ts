import z from "zod";

const CHARACTER_LIMIT = 3000;

export const articleRequest = z
  .object({
    article: z.string().max(CHARACTER_LIMIT),
  })
  .required();

export const questionAnswerRequest = z
  .object({
    question: z.string().max(CHARACTER_LIMIT),
    article: z.string(),
    chatlog: z.string(),
  })
  .required();

export type IArticleRequest = z.infer<typeof articleRequest>;
export type IQuestionAnswerRequest = z.infer<typeof questionAnswerRequest>;
