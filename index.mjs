import { app } from './app'
import ServerlessHttp from 'serverless-http'

export const handler = ServerlessHttp(app, {
	response: { headers: { 'Access-Control-Allow-Origin': '*' } }
})
