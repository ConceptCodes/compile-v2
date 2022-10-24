import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";
import AI from "../../../utils/ai";

const CHARACTER_LIMIT = 3000;

export const apiRouter = router({
  ping: publicProcedure.query(() => { return "PONG" }),
  summarize: protectedProcedure
    .input(z.object({ article: z.string().max(CHARACTER_LIMIT) }).required())
    .mutation(async ({ input }) => {
      return await AI.summarize(input?.article) as string;
  }),
  paraphrase: publicProcedure
    .input(z.object({ article: z.string().max(CHARACTER_LIMIT) }).required())
    .mutation(async ({ input }) => {
      return await AI.paraphrase(input?.article) as string;
  })
})
