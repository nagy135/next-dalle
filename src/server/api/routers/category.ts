import { eq, isNull } from "drizzle-orm";
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

	getNWithChildren: publicProcedure.input(
		z.number().default(3)
	)
		.query(({ ctx, input }) => {
			return ctx.db.query.categories.findMany({
				orderBy: (posts, { desc }) => [desc(posts.createdAt)],
				limit: input,
				with: {
					children: true,
				},
				where: isNull(categories.parentId),
			});
		}),

	deleteById: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
		return ctx.db.delete(categories).where(eq(categories.id, input));
	}),

	create: protectedProcedure.input(z.object({
		name: z.string(),
		parentId: z.number().optional(),
	})).mutation(({ ctx, input }) => {
		return ctx.db.insert(categories).values({
			name: input.name,
			parentId: input.parentId,
		});
	}),
});
