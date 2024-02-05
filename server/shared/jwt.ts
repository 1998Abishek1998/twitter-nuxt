import jwt from 'jsonwebtoken'
import type { EventHandlerResponse } from 'h3'

export type UserPayload = {
  data: string;
};

export const generateToken = (payload: { id: string }) => {
  const { jwtAccessSecret, jwtRefreshSecret } = useRuntimeConfig()

  const accessToken = jwt.sign({
    data: payload.id
  }, jwtAccessSecret, { expiresIn: '10m' });

  const refresToken = jwt.sign({
    data: payload.id
  }, jwtRefreshSecret, { expiresIn: '1d' });

  return {
    accessToken,
    refresToken
  }
}

export const verifyToken = (token: string) => {
  const { jwtAccessSecret } = useRuntimeConfig()
  return jwt.verify(token, jwtAccessSecret) as UserPayload;
}

export const decodeRefreshToken = (token: string) => {
  const { jwtRefreshSecret } = useRuntimeConfig()

  return jwt.verify(token, jwtRefreshSecret) as UserPayload
}

export const sendRefreshToken = (event: EventHandlerResponse, token: string) => {
  setCookie(event, 'refresh_token', token, {
    httpOnly: true,
    sameSite: true
  })
}
