<template>
  <div>
    <TweetFormInput :user="props.user" @on-submit="handleOnSubmit" :placeholder="props.placeholder"
      :button-lable="props.buttonLable" :text-area-col="props.textAreaCol" :text-area-row="props.textAreaRow" />
  </div>
</template>
<script setup>

const emits = defineEmits(['onSubmit'])

const props = defineProps({
  user: {
    type: Object,
    required: true
  },
  placeholder: {
    type: String,
    default: 'Say something...'
  },
  buttonLable: {
    type: String,
    default: 'Tweet'
  },
  textAreaRow: {
    type: Number,
    default: 5
  },
  textAreaCol: {
    type: Number,
    default: 5
  },
  replyTo: {
    type: String,
    default: null
  }
})

function handleOnSubmit(value) {
  emits('onSubmit', {
    ...value,
    replyTo: props.replyTo
  })
}

</script>
