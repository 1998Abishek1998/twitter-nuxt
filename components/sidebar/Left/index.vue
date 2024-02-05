<template>
  <div class="h-screen flex flex-col">

    <div class="p-2 my-2 hover:bg-blue-50 dark:hover:bg-blue-500 rounded-full w-min" :class="defaultTransition">
      <NuxtLink to="/">
        <div class="w-8 h-8">
          <LogoTwitter />
        </div>
      </NuxtLink>
    </div>

    <div>

      <LazySidebarLeftTab active>
        <template v-slot:icon>
          <HomeIcon />
        </template>
        <template v-slot:name>
          Home
        </template>
      </LazySidebarLeftTab>
      <SidebarLeftTab>
        <template v-slot:icon>
          <HashtagIcon />
        </template>
        <template v-slot:name>
          Explore
        </template>
      </SidebarLeftTab>


      <SidebarLeftTab>
        <template v-slot:icon>
          <BellIcon />
        </template>
        <template v-slot:name>
          Notifications
        </template>
      </SidebarLeftTab>


      <SidebarLeftTab>
        <template v-slot:icon>
          <InboxIcon />
        </template>
        <template v-slot:name>
          Messages
        </template>
      </SidebarLeftTab>

      <SidebarLeftTab>
        <template v-slot:icon>
          <BookmarkIcon />
        </template>
        <template v-slot:name>
          Bookmarks
        </template>
      </SidebarLeftTab>


      <SidebarLeftTab>
        <template v-slot:icon>
          <DocumentTextIcon />
        </template>
        <template v-slot:name>
          Lists
        </template>
      </SidebarLeftTab>


      <SidebarLeftTab>
        <template v-slot:icon>
          <UserIcon />
        </template>
        <template v-slot:name>
          Profile
        </template>
      </SidebarLeftTab>

      <SidebarLeftTab>
        <template v-slot:icon>
          <EllipsisHorizontalCircleIcon />
        </template>
        <template v-slot:name>
          More
        </template>
      </SidebarLeftTab>
      <div class="hidden xl:block">
        <UiButton liquid size="lg" @on-click="handleClick">
          Tweet
        </UiButton>
      </div>
      <div class="block xl:hidden">
        <UiButton @on-click="handleClick">
          <div class="w-6 h-6 font-bold">
            <PencilIcon />
          </div>
        </UiButton>
      </div>
    </div>

  </div>
</template>

<script setup>
import { HomeIcon } from '@heroicons/vue/20/solid'
import { HashtagIcon, BellIcon, InboxIcon, BookmarkIcon, DocumentTextIcon, UserIcon, EllipsisHorizontalCircleIcon, PencilIcon } from '@heroicons/vue/24/outline'
const { defaultTransition } = useTailwindConfig()
const emits = defineEmits(['openTweetModal'])

function handleClick() {
  emits('openTweetModal')
}

</script>
