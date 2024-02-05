import { User } from '@prisma/client'
import { prisma } from '.'

export const createUser = (userData: User) => {
  return prisma.user.create({
    data: userData
  })
}

export const getUserByUserName = (username: string) => {
  return prisma.user.findUnique({
    where: {
      username
    }
  })
}

export const getUserByUserid = (id: string) => {
  return prisma.user.findUnique({
    where: {
      id
    }
  })
}
