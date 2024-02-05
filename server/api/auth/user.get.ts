export default defineEventHandler(async (event) => {
  const user = event.context.auth
  return {
    message: 'User created successfully',
    user: user.user
  }
})
