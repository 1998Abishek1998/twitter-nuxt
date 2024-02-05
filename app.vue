<template>
  <div :class="{ 'dark': darkMode }">
    <div class="bg-white dark:bg-dim-900">

      <!-- App -->
      <LazyUiLoading v-if="isLoading" />

      <div v-else-if="user" class="min-h-full">
        <div class="grid grid-cols-12 mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:gap-10">

          <!-- left bar -->
          <div class="hidden md:block xs:col-span-1 xl:col-span-2">
            <div class="sticky top-0">
              <LazySidebarLeft @open-tweet-modal="handleModalOpen" />
            </div>
          </div>
          <!-- main -->
          <main class="col-span-12 md:col-span-8 xl:col-span-6">
            <RouterView />
          </main>
          <!-- right bar -->
          <div class="hidden md:block xs:col-span-1 xl:col-span-4 md:col-span-3">
            <div class="sticky top-0">
              <LazySidebarRight />
            </div>
          </div>
        </div>
      </div>

      <!-- Auth -->
      <LazyAuthPage v-else />
      <UiDialog :isOpen="postTweetModal" @on-close="handleModalClose" :loading="loading">
        <TweetForm :user="user" @on-submit="handleFormSubmit" :placeholder="replyPlaceholder" />
      </UiDialog>
    </div>
  </div>
</template>

<script setup>
import { REPLY_TWEET_EMIT } from './composables/useEmmitters';

const darkMode = ref(false)
const loading = ref(false)
const isReply = ref(false)

const replyPlaceholder = computed(() => isReply.value ? 'Write a reply' : "What's happening ?")

const { useAuthUser, initAuth, useAuthLoading } = useAuth()
const user = useAuthUser()
const isLoading = useAuthLoading()

const { postTweet, closePostTweetModal, usePostTweetModal, openPostTweetModal, useReplyTweet } = useTweet()
const postTweetModal = usePostTweetModal()
const replyTweet = useReplyTweet()

const emmiter = useEmmitters()

emmiter.$on(REPLY_TWEET_EMIT, (tweet) => {
  isReply.value = true
  openPostTweetModal(tweet)
})

onBeforeMount(() => {
  initAuth()
})

function handleModalOpen() {
  isReply.value = false
  openPostTweetModal(null)
}

function handleModalClose() {
  closePostTweetModal()
}

async function handleFormSubmit(value) {
  loading.value = true
  try {
    const data = await postTweet({
      text: value.text,
      mediaFiles: value.mediaFiles,
      replyTo: isReply.value ? replyTweet.value.id : value.replyTo
    })

    closePostTweetModal()

    if (isReply.value) navigateTo({ path: `/status/${replyTweet.value.id}/` })
    else navigateTo({ path: `/status/${data.tweet.id}/` })

  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}


</script>
