<template>
  <div>

    <div v-if="noTweetsFound" class="p-4">
      <p class="text-center text-gray-500">
        {{ noList }}
      </p>
    </div>
    <div v-else v-for="tweet in tweets" class="pb-4 border-b hover:bg-gray-100 dark:hover:bg-dim-300"
      :class="[twitterBorderColor, defaultTransition]" :key="tweet.id">
      <TweetItem :tweet="tweet" compact />
    </div>
  </div>
</template>
<script setup>
const { defaultTransition, twitterBorderColor } = useTailwindConfig()
const props = defineProps({
  tweets: {
    type: Array,
    required: true
  },
  isReply: {
    type: Boolean,
    default: false
  }
})

const noTweetsFound = computed(() => props.tweets.length < 1)
const noList = computed(() => props.isReply ? 'Be first to leave a reply' : 'No tweets. ')

</script>
