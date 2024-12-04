import { Application } from '@oak/oak'
import { router } from '@/router/index.ts'
import { fetchRouter } from '@/router/fetch-router.ts'

const app = new Application()

app.use(router.routes())
app.use(router.allowedMethods())

app.use(fetchRouter.routes())
app.use(fetchRouter.allowedMethods())

app.listen({ port: 8080 })
