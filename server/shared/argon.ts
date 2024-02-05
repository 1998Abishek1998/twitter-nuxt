import { hash, verify } from 'argon2';

export const encryptPassword = async (password: string) => {
  try {
    const hash_str = await hash(password);
    return hash_str
  } catch (err) {
    throw createError({
      statusCode: 500,
      message: 'Internal server Error'
    })
  }
}

export const verifyPassword = async (dbPassword: string, incomingPassword: string) => {
  try {
    if (await verify(dbPassword, incomingPassword)) return true
    else return false
  } catch (err) {
    throw createError({
      statusCode: 500,
      message: 'Internal server Error'
    })
  }
}
