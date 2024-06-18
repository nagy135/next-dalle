import { eq } from "drizzle-orm";
import { z } from "zod";
import {
	createTRPCRouter,
	protectedProcedure,
	publicProcedure,
} from "~/server/api/trpc";
import { categories } from "~/server/db/schema";

export const categoryRouter = createTRPCRouter({
	getAll: publicProcedure.query(({ ctx }) => {
		return ctx.db.query.categories.findMany({
			orderBy: (posts, { desc }) => [desc(posts.createdAt)],
		});
	}),

	deleteById: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
		return ctx.db.delete(categories).where(eq(categories.id, input));
	}),
});
