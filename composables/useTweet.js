export default () => {

  const usePostTweetModal = () => useState('post_tweet_modal', () => false)
  const useReplyTweet = () => useState('reply_tweet', () => null)

  const closePostTweetModal = () => {
    const isModalOpen = usePostTweetModal()
    isModalOpen.value = false
  }

  const openPostTweetModal = (tweet = null) => {
    const isModalOpen = usePostTweetModal()
    setReplyTweet(tweet)
    isModalOpen.value = true
  }

  const setReplyTweet = (tweet) => {
    const isReply = useReplyTweet()
    isReply.value = tweet
  }

  const postTweet = (formData) => {
    const form = new FormData()

    form.append('text', formData.text)
    form.append('replyTo', formData.replyTo)

    formData.mediaFiles.forEach((media, index) => {
      form.append('media_file_' + index, media)
    })

    return useFetchApi('/api/user/tweets', true, {
      method: 'POST',
      body: form
    })
  }

  const fetchTweets = async () => {
    try {
      const data = await useFetchApi('/api/tweets', true, {
        method: 'GET'
      })
      return data.tweets
    } catch (error) {
      console.log(error)
    }
  }

  const fetchTweetById = (id) => {
    return new Promise(async (res, rej) => {
      try {
        const data = await useFetchApi(`/api/tweets/${id}`, true, {
          method: 'GET'
        })
        res(data.tweet)
      } catch (error) {
        console.log(error)
        rej(error)
      }
    })
  }

  return {
    postTweet,
    fetchTweets,
    fetchTweetById,
    closePostTweetModal,
    usePostTweetModal,
    openPostTweetModal,
    useReplyTweet
  }
}
