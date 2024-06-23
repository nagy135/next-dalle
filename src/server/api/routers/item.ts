import { eq } from "drizzle-orm";
import { z } from "zod";
import {
	createTRPCRouter,
	protectedProcedure,
	publicProcedure,
} from "~/server/api/trpc";
import { items } from "~/server/db/schema";

export const itemRouter = createTRPCRouter({
	getN: publicProcedure.input(
		z.number().default(5)
	).query(({ ctx, input }) => {
		return ctx.db.query.items.findMany({
			orderBy: (posts, { desc }) => [desc(posts.createdAt)],
			with: {
				category: true,
			},
			limit: input
		});
	}),

	getAll: publicProcedure.query(({ ctx }) => {
		return ctx.db.query.items.findMany({
			orderBy: (posts, { desc }) => [desc(posts.createdAt)],
			with: {
				category: true,
			}
		});
	}),

	getByCategoryId: publicProcedure.input(z.number()).query(({ ctx, input }) => {
		return ctx.db.query.items.findMany({
			where: eq(items.categoryId, input),
			with: {
				category: true,
			}
		});
	}),

	deleteById: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
		return ctx.db.delete(items).where(eq(items.id, input));
	}),

	create: protectedProcedure.input(z.object({
		name: z.string(),
		categoryId: z.number(),
	})).mutation(({ ctx, input }) => {
		return ctx.db.insert(items).values({
			name: input.name,
			categoryId: input.categoryId,
		});
	}),

});
