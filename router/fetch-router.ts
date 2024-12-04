import { Router } from '@oak/oak'
import { oakCors } from 'https://deno.land/x/cors/mod.ts'

const fetchRouter = new Router()

fetchRouter.use(oakCors())
fetchRouter.prefix('/api/v1/fetch/:url')
fetchRouter.get('/', async (ctx) => {
	try {
		const url = ctx.params.url
		if (!url) throw new Error('No URL provided')
		//
		const response = await fetch(url, {
			headers: {
				'User-Agent': 'Mozilla/5.0',
				Accept: 'image/*',
			},
		})
		//
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`)
		}
		//
		const arrayBuffer = await response.arrayBuffer()
		const contentType = response.headers.get('Content-Type') || 'image/jpeg'
		//
		ctx.response.headers.set('Content-Type', contentType)
		ctx.response.body = arrayBuffer
		//
	} catch (error: any) {
		ctx.response.status = 408
		ctx.response.body = error.message || 'Image fetch failed'
	}
})

export { fetchRouter }