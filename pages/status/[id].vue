<template>
  <div>
    <MainSection title="Tweet" :loading="loading">

      <Head>
        <Title>Tweet / Twitter</Title>
      </Head>

      <div>
        <TweetDetails :tweet="tweet" :user="user" @on-success="handleOnSuccess" />
      </div>
    </MainSection>
  </div>
</template>
<script setup>

const loading = ref(true)
const tweet = ref(null)

const { fetchTweetById } = useTweet()
const { useAuthUser } = useAuth()
const user = useAuthUser()

const computedRouteId = computed(() => useRoute().params.id)

async function getTweetById() {
  loading.value = true
  try {
    const tweetData = await fetchTweetById(computedRouteId.value)
    tweet.value = tweetData
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}

const handleOnSuccess = () => {
  getTweetById()
}

watchEffect(() => getTweetById())

</script>
