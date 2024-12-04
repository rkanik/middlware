import { Router } from '@oak/oak'

const router = new Router()

router.prefix('/api/v1')
router.get('/', (ctx) => {
	ctx.response.body = 'Hello World!'
})

export { router }
