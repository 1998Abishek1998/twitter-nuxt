<template>
  <div>
    <MainSection title="Home" :loading="loading">

      <Head>
        <Title>Home / Twitter</Title>
      </Head>

      <div class="border-b" :class="twitterBorderColor">
        <TweetForm :user="user" placeholder="What's on your mind ?" @on-submit="handleOnSubmit" />
      </div>
      <LazyTweetListFeed :tweets="homeTweets" />
    </MainSection>
  </div>
</template>

<script setup>
const { twitterBorderColor } = useTailwindConfig()
const loading = ref(false)
const homeTweets = ref([])
const { useAuthUser } = useAuth()
const { fetchTweets, postTweet } = useTweet()

const user = useAuthUser()

async function handleOnSubmit(value) {
  loading.value = true
  try {
    const data = await postTweet({
      text: value.text,
      mediaFiles: value.mediaFiles,
      replyTo: value.replyTo
    })
    navigateTo({
      path: `/status/${data.tweet.id}`
    })
  } catch (error) {
    console.log(error)
  }
  loading.value = false
}

onBeforeMount(async () => {
  loading.value = true
  try {
    const tweets = await fetchTweets()
    homeTweets.value = tweets
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
})

</script>
 