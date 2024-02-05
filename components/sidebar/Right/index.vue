<template>
  <div class="flex flex-col">
    <!-- Search box -->

    <LazySidebarRightPreviewCard title="What's Happening">
      <LazySidebarRightPreviewCardItem v-for="itm in whatsHappeningItems">
        <div>
          <h2 class="font-bold text-gray-800 text-md dark:text-white ">{{ itm.title }}</h2>
          <p class="text-xs text-gray-400">{{ itm.count }}</p>
        </div>
      </LazySidebarRightPreviewCardItem>
    </LazySidebarRightPreviewCard>

    <LazySidebarRightPreviewCard title="Who to follow">
      <LazySidebarRightPreviewCardItem v-for="itm in whoToFollowItems">
        <div class="flex flex-row items-center justify-between p-2">
          <div class="flex flex-row">
            <img class="w-10 h-10 rounded-full" :src="itm.image" :alt="itm.name">
            <div class="flex flex-col ml-2 ">
              <h1 class="text-sm font-bold text-gray-900 dark:text-white">{{ itm.name }}</h1>
              <p class="text-xm text-gray-400">{{ itm.handle }}</p>
            </div>
          </div>
          <div class="flexr h-full">
            <button
              class="px-4 py-2 font-bold text-xs text-white dark:text-black bg-black dark:bg-white rounded-full">Follow</button>
          </div>
        </div>
      </LazySidebarRightPreviewCardItem>
    </LazySidebarRightPreviewCard>
  </div>
</template>
<script setup>
const whatsHappeningItems = ref([
  {
    title: 'SpaceX',
    count: '18.8k Tweets'
  },
  {
    title: 'Blade Runner',
    count: '14.4k Tweets'
  },
  {
    title: 'Virat Kholi',
    count: '12.2k Tweets'
  },
])

const whoToFollowItems = ref([
  {
    name: 'Joe Biden',
    handle: '@joebd',
    image: 'https://picsum.photos/200/200'
  },
  {
    name: 'Joe Biden',
    handle: '@joebd',
    image: 'https://picsum.photos/200/200'
  },
  {
    name: 'Joe Biden',
    handle: '@joebd',
    image: 'https://picsum.photos/200/200'
  },
])
</script>
