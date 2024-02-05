<template>
  <div class="flex items-center">
    <NuxtLink class="flex p-4" to="#">
      <div>
        <img :src="props.tweet.author.profileImage" alt="" class="inline-block w-10 h-10 rounded-full" />
      </div>
      <div class="flex flex-col ml-3">
        <span class="font-medium text-gray-800 dark:text-white">{{ props.tweet.author.name }}</span>
        <span class="font-medium text-gray-400">{{ props.tweet.author.handle }}</span>
      </div>
    </NuxtLink>
    <div class="mb-6">
      <span class="font-sm text-gray-400"> {{ props.tweet.createdAt }}.</span>
    </div>
    <div class="mb-6 ml-2">
      <p v-if="props.tweet.replyTo" class="text-sm text-gray-400">
        Replying to <NuxtLink :to="replyTweetUrl" class="text-blue-400">{{ props.tweet.replyTo.author.handle }}</NuxtLink>
      </p>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  tweet: {
    type: Object,
    required: true
  }
})
const replyTweetUrl = computed(() => `/status/${props.tweet?.replyTo?.id}`)
</script>
