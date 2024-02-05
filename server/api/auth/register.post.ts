import { User } from '@prisma/client'
import { createUser } from '~/server/db/users'
import { encryptPassword } from '~/server/shared/argon'
import { userTransformer } from '~/server/transformsers/user'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const { username, email, password, repeatPassword, name } = body

  if (!username || !email || !password || !repeatPassword || !name) throw createError({
    statusCode: 400,
    message: 'Please provide all the required fields'
  })

  if (password !== repeatPassword) throw createError({
    statusCode: 400,
    message: 'Passwords did not match'
  })

  const userData = {
    username,
    email,
    password: await encryptPassword(password),
    name,
    profileImage: 'https://picsum.photos/200/200'
  } as User

  const user = await createUser(userData)

  return {
    message: 'User created successfully',
    user: userTransformer(user)
  }
})
