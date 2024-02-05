import formidable from 'formidable'
import { createMediaFile } from '~/server/db/mediaFile'
import { createTweet } from '~/server/db/tweet'
import { uploadToCloudinary } from '~/server/shared/cloudinary'
import { tweetTransformer } from '~/server/transformsers/tweet'

export default defineEventHandler(async (event) => {
  const body = formidable({})
  const userId = event.context?.auth?.user?.id

  const { fields, files } = await new Promise((res, rej) => {
    body.parse(event.req, (err: any, fields: any, files: any) => {
      if (err) rej(err)
      res({ fields, files })
    })
  })

  const tweetData = {
    authorId: userId,
    text: fields.text[0],
    replyToId: undefined
  }

  const replyTo = fields.replyTo

  if (replyTo && replyTo[0] !== null && replyTo[0] !== undefined && replyTo[0] !== 'null' && replyTo[0] !== 'undefined') tweetData.replyToId = replyTo[0]

  const tweet = await createTweet(tweetData)
  const filePromise = Object.keys(files).map(async key => {
    const file = files[key]
    const response = await uploadToCloudinary(file[0].filepath)

    return createMediaFile({
      url: response.secure_url,
      providerPublicId: response.public_id,
      userId: userId,
      tweetId: tweet.id
    })
  })

  await Promise.all(filePromise)

  return {
    tweet: tweetTransformer(tweet)
  }
})
