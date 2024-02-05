import { jwtDecode } from 'jwt-decode'

export default () => {
  const useAuthToken = () => useState('authToken')
  const useAuthUser = () => useState('authUser')
  const useAuthLoading = () => useState('authLoading', () => true)

  const setToken = (newToken) => {
    const authToken = useAuthToken()
    authToken.value = newToken
  }

  const setUser = (newUser) => {
    const authUser = useAuthUser()
    authUser.value = newUser
  }

  const login = ({ username, password }) => {
    return new Promise(async (resolve, reject) => {
      useAuthLoading().value = true
      try {
        const data = await useFetchApi('/api/auth/login', false, {
          method: 'POST',
          body: {
            username,
            password
          }
        })

        setToken(data.token)
        setUser(data.user)
        resolve(true)
      } catch (error) {
        reject(error)
      }
      useAuthLoading().value = false
    })
  }

  const refreshToken = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await useFetchApi('/api/auth/refresh', false)
        setToken(data.token)
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  }

  const getUser = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await useFetchApi('/api/auth/user', true)
        setUser(data.user)
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  }

  const reRefreshAccess = () => {
    const token = useAuthToken()
    if (!token) return

    const jwt = jwtDecode(token.value)
    const newRefreshTime = jwt.exp - 6000

    setTimeout(async () => {
      await refreshToken()
      reRefreshAccess()
    }, newRefreshTime)
  }

  const initAuth = () => {
    return new Promise(async (resolve, reject) => {
      useAuthLoading().value = true
      try {
        await refreshToken()
        await getUser()
        reRefreshAccess()
        resolve()
      } catch (error) {
        reject(error)
      }
      useAuthLoading().value = false
    })
  }

  return {
    login,
    useAuthToken,
    useAuthUser,
    initAuth,
    useAuthLoading,
  }
}
