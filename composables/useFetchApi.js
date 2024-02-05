export default (url, isAuth, options = {}) => {
  const { useAuthToken } = useAuth()

  return $fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: isAuth ? `Bearer ${useAuthToken().value}` : ''
    }
  })
}
