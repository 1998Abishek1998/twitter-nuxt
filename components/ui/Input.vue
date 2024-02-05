<template>
  <div>
    <label v-if="props.label" class="block pl-3 ml-px text-sm font-medium text-gray-700">
      {{ props.label }}
    </label>
    <div class="mt-1">
      <input :type="props.type" :value="props.modelValue" :placeholder="props.placeholder"
        class="block w-full border-gray-300 rounded-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        @input="e => emits('update:modelValue', e.target.value)" />
    </div>
  </div>
</template>
<script setup>
const emits = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  label: {
    type: String,
    default: ""
  },
  type: {
    type: String,
    default: "text"
  },
  placeholder: {
    type: String,
    default: null
  }
})
</script>
 