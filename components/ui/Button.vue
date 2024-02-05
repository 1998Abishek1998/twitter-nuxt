<template>
  <button
    class="flex justify-center text-white bg-blue-400 rounded-full hover:bg-blue-500 font-sm disabled:bg-blue-300 disabled:cursor-not-allowed"
    :disabled="props.disabled" :class="classes" @click="handleClick">
    <span>
      <slot />
    </span>
  </button>
</template>
<script setup>

const emits = defineEmits(['onClick'])
function handleClick(event) {
  emits('onClick', event)
}

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: 'md'
  },
  liquid: {
    type: Boolean,
    default: false
  }
})

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm': return 'px-2 py-2 text-sm font-light'
    case 'lg': return 'px-4 py-3 text-md font-bold'
    default: return 'py-3 px-3 text-sm font-medium'
  }
})

const classes = computed(() => `${sizeClasses.value} ${props.liquid ? 'w-full' : 'w-min'}`)

</script>
