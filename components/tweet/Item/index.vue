
<template>
  <div>
    <TweetItemHeader :tweet="props.tweet" />
    <div :class="tweetBodyWrapper">
      <NuxtLink :to="`/status/${props.tweet.id}`">
        <p class="flex-shrink w-auto font-medium text-gray-800 dark:text-white" :class="textSize">
          {{ props.tweet.text }}
        </p>

        <div v-for="image in props.tweet.mediaFiles" :key="image.id" class="flex my-3 mr-2 border-2 rounded-2xl"
          :class="twitterBorderColor">
          <img :src="image.url" class="w-full rounded-2xl" />
        </div>
      </NuxtLink>

      <div class="mt-3">
        <TweetItemActions :tweet="props.tweet" :compact="props.compact" @onCommentClick="handleComment" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { REPLY_TWEET_EMIT } from '~/composables/useEmmitters';


const { twitterBorderColor } = useTailwindConfig()
const emmitter = useEmmitters()

const props = defineProps({
  tweet: {
    type: Object,
    required: true
  },
  compact: {
    type: Boolean,
    default: false
  }
})
const tweetBodyWrapper = computed(() => props.compact ? 'ml-16' : 'ml-2 mt-4')
const textSize = computed(() => props.compact ? 'text-base' : 'text-2xl')

function handleComment() {
  emmitter.$emit(REPLY_TWEET_EMIT, props.tweet)
}

</script>
