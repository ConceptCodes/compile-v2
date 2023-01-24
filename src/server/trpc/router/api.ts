import { router, publicProcedure, protectedProcedure } from "../trpc";
import AI from "../../../utils/ai";
import { articleRequest, questionAnswerRequest } from "../../../types/api";

export const apiRouter = router({
  ping: publicProcedure.query(() => {
    return "PONG";
  }),
  summarize: protectedProcedure
    .input(articleRequest)
    .mutation(async ({ input }) => {
      const result = (await AI.summarize(input?.article)) as string;
      return result;
    }),
  paraphrase: protectedProcedure
    .input(articleRequest)
    .mutation(async ({ input }) => {
      const result = (await AI.paraphrase(input?.article)) as string;
      return result;
    }),
  questionAnswer: protectedProcedure
    .input(questionAnswerRequest)
    .mutation(async ({ input }) => {
      const result = (await AI.answer(input)) as string;
      return result;
    }),
});
