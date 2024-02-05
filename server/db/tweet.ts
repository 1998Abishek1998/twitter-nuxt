import { prisma } from '.'

export const createTweet = (tweetData: { authorId: string; text: string; replyToId?: string }) => {
  return prisma.tweet.create({ data: tweetData })
}

export const getTweets = (params: any) => {
  return prisma.tweet.findMany(params)
}

export const getTweetById = (id: string, params: any) => {
  return prisma.tweet.findUnique({
    where: {
      id
    },
    ...params
  })
}
