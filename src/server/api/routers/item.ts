import { eq } from "drizzle-orm";
import { z } from "zod";
import {
	createTRPCRouter,
	protectedProcedure,
	publicProcedure,
} from "~/server/api/trpc";
import { items } from "~/server/db/schema";

export const itemRouter = createTRPCRouter({
	getAll: publicProcedure.query(({ ctx }) => {
		return ctx.db.query.items.findMany({
			orderBy: (posts, { desc }) => [desc(posts.createdAt)],
		});
	}),

	deleteById: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
		return ctx.db.delete(items).where(eq(items.id, input));
	}),

});
