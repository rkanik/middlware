import { Application } from '@oak/oak'
import { router } from '@/router/index.ts'
import { fetchRouter } from '@/router/fetch-router.ts'

const app = new Application()

app.use(router.routes())
app.use(router.allowedMethods())

app.use(fetchRouter.routes())
app.use(fetchRouter.allowedMethods())

app.use(async (ctx, next) => {
	const root = `${Deno.cwd()}/public`
	try {
		if (ctx.request.url.pathname === '/') {
			return ctx.send({
				root: root + '/index.html',
			})
		}
		await ctx.send({ root })
	} catch {
		next()
	}
})

app.listen({ port: 8080 })
