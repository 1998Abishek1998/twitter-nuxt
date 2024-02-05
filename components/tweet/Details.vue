<template>
  <div>
    <TweetItem :tweet="props.tweet" />
    <LazyTweetForm placeholder="Tweet your reply" :user="props.user" button-lable="Reply" :text-area-col=5
      :text-area-row=2 @on-submit="handleOnSubmit" />

    <TweetListFeed :tweets="replies" is-reply />
  </div>
</template>
<script setup>
const emits = defineEmits(['onSuccess'])
const { postTweet } = useTweet()
const loading = ref(false)
const props = defineProps({
  tweet: {
    type: Object,
    required: true
  },
  user: {
    type: Object,
    required: true
  }
})

async function handleOnSubmit(value) {
  loading.value = true
  try {
    await postTweet({
      text: value.text,
      mediaFiles: value.mediaFiles,
      replyTo: props.tweet.id
    })
    emits('onSuccess')
  } catch (error) {
    console.log(error)
  }
  loading.value = false
}

const replies = computed(() => props.tweet?.replies || [])
</script>
