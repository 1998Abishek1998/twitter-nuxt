
<template>
  <div>
    <NuxtLink to="/"
      class="flex flex-row items-center p-3 w-min hover:bg-gray-200 rounded-full dark:hover:bg-dim-200 dark:text-white text-black"
      :class="defaultTransition">
      <div class="w-6 h-6 text-dark">
        <slot name="icon"></slot>
      </div>
      <div class="text-xl ml-4 hidden lg:block" :class="textClasses">
        <slot name="name"></slot>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup>
const { defaultTransition } = useTailwindConfig()

const props = defineProps({
  active: {
    type: Boolean,
    default: false
  }
})

const textClasses = computed(() => props.active ? 'text-semibold' : 'font-normal')

</script>
