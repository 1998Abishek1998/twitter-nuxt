import { getTweetById } from '~/server/db/tweet'
import { tweetTransformer } from '~/server/transformsers/tweet'

export default defineEventHandler(async (event) => {
  const { id } = (event.context.params as { id: string });

  const tweet = await getTweetById(id, {
    where: {
      id: id
    },
    include: {
      author: true,
      MediaFile: true,
      replies: {
        include: {
          MediaFile: true,
          author: true,
          replies: {
            include: {
              author: true
            }
          },
          replyTo: {
            include: {
              author: true,
            }
          },
        }
      },
      replyTo: {
        include: {
          author: true,
        }
      },
    }
  })

  if (!tweet) throw createError({
    statusCode: 400,
    message: 'Please provide valid tweet id.'
  })

  return {
    tweet: tweetTransformer(tweet)
  }
})
