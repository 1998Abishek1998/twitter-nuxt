import { RefreshToken } from '@prisma/client'
import { createRefreshToken } from '~/server/db/refreshTokens'
import { getUserByUserName } from '~/server/db/users'
import { verifyPassword } from '~/server/shared/argon'
import { generateToken, sendRefreshToken } from '~/server/shared/jwt'
import { userTransformer } from '~/server/transformsers/user'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { username, password } = body

  if (!username || !password) throw createError({
    message: 'Please provide all the fields'
  })

  const user = await getUserByUserName(username)

  if (!user) throw createError({
    message: 'User does not exists.'
  })

  if (!verifyPassword(user.password, password)) throw createError({
    message: 'Passwords did not match'
  })

  const token = generateToken({ id: user.id })

  const tokenData = {
    token: token.refresToken,
    userId: user.id
  } as RefreshToken

  await createRefreshToken(tokenData)

  sendRefreshToken(event, token.refresToken)

  return {
    token: token.accessToken,
    user: userTransformer(user)
  }
})
