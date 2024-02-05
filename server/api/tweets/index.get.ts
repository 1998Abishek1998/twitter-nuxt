import { getTweets } from '~/server/db/tweet'
import { tweetTransformer } from '~/server/transformsers/tweet'

export default defineEventHandler(async (event) => {

  const tweets = await getTweets({
    include: {
      author: true,
      MediaFile: true,
      replies: {
        include: {
          author: true,
        }
      },
      replyTo: {
        include: {
          author: true,
        }
      },
    },
    orderBy: [
      {
        createdAt: 'desc'
      }
    ]
  })
  return {
    tweets: tweets.map(tweetTransformer)
  }
})
