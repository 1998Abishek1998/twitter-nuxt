import human from 'human-time'

import { mediaFileTransformer } from './mediaFile'
import { userTransformer } from './user'

export const tweetTransformer = (tweet: any): any => {
  return {
    id: tweet.id,
    text: tweet.text,
    createdAt: human(tweet.createdAt),
    author: tweet.author ? userTransformer(tweet.author) : null,
    mediaFiles: tweet.MediaFile ?
      tweet.MediaFile.map(mediaFileTransformer)
      : [],
    replies: tweet.replies ? tweet.replies.map(tweetTransformer) : [],
    replyTo: tweet.replyTo ? tweetTransformer(tweet.replyTo) : null,
    repliesCount: tweet.replies ? tweet.replies.length : 0
  }
}
