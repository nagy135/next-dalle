import {
	createTRPCRouter,
	protectedProcedure,
	publicProcedure,
} from "~/server/api/trpc";

export const itemRouter = createTRPCRouter({
	getAll: publicProcedure.query(({ ctx }) => {
		return ctx.db.query.items.findMany({
			orderBy: (posts, { desc }) => [desc(posts.createdAt)],
		});
	}),

	getSecretMessage: protectedProcedure.query(() => {
		return "you can now see this secret message!";
	}),
});
