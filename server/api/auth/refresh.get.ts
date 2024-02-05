import { getRefreshToken } from '~/server/db/refreshTokens'
import { getUserByUserid } from '~/server/db/users'
import { decodeRefreshToken, generateToken, sendRefreshToken } from '~/server/shared/jwt'

export default defineEventHandler(async (ev) => {
  const cookies = getCookie(ev, 'refresh_token')

  if (!cookies) throw createError({
    statusCode: 401,
    message: 'Token is not valid'
  })

  const refreshToken = await getRefreshToken(cookies)

  if (!refreshToken) throw createError({
    statusCode: 401,
    message: 'Invalid token provided'
  })

  const token = decodeRefreshToken(refreshToken.token)

  if (!token) throw createError({
    statusCode: 401,
    message: 'Token has expired login to continue'
  })

  const user = await getUserByUserid(token.data)

  if (!user) throw createError({
    statusCode: 401,
    message: 'Token has expired login to continue'
  })

  const tokens = generateToken({ id: user.id })

  return {
    token: tokens.accessToken
  }
})
