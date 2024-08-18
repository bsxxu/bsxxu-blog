import { publicProcedure, router } from '../../server/trpc';

export const authRouter = router({
	test: publicProcedure.query(async () => {
		return null;
	}),
});
