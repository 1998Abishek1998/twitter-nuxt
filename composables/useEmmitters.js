import mitt from 'mitt';

const emmitter = mitt()

export default function useEmmitters() {
  return {
    $on: emmitter.on,
    $emit: emmitter.emit
  }
}

export const REPLY_TWEET_EMIT = 'replyTweet'
