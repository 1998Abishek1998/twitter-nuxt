import UrlPattern from 'url-pattern'
import { verifyToken } from '../shared/jwt'
import { getUserByUserid } from '../db/users'
import { userTransformer } from '../transformsers/user'

export default defineEventHandler(async (event) => {
  const endpoints = [
    '/api/auth/user',
    '/api/user/tweets',
    '/api/tweets',
    '/api/tweets/:id'
  ]
  const path = getRequestURL(event).pathname

  const toHandleMiddleware = endpoints.some(str => {
    const pattern = new UrlPattern(str)
    return pattern.match(path)
  })

  if (!toHandleMiddleware) return

  const token = getHeader(event, 'Authorization')
  if (!token) throw createError({
    statusCode: 401,
    message: 'Please provide authentication token.'
  })

  const decoded = verifyToken(token.split(' ')[1])

  if (!decoded) throw createError({
    statusCode: 401,
    message: 'You are not authorized to consume this route.'
  })

  try {
    const userId = decoded.data
    const user = await getUserByUserid(userId)
    if (user) event.context.auth = { user: userTransformer(user) }
  } catch (error) {
    throw createError({
      statusCode: 401,
      message: 'You are not authorized to consume this route.'
    })
  }
})
