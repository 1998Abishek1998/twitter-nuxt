<template>
  <div>

    <div class="flex items-center flex-shrink-0 p-4 pb-0">
      <div class="flex w-12 items-top">
        <img :src="props.user?.profileImage" alt="" class="inline-block w-10 h-10 rounded-full" />
      </div>
      <div class="w-full p-2">
        <textarea v-model="text" :rows="props.textAreaRow" :cols="props.textAreaCol" :placeholder="props.placeholder"
          :class="twitterBorderColor"
          class="rounded-2xl w-full text-lg text-gray-900 placeholder:text-gray-400 bg-transparent dark:text-white focus:ring-0 border-0"></textarea>
      </div>
    </div>

    <!-- 
      File Selector reference
     -->

    <div class="p-4 pl-16">
      <img v-if="inputImageUrl" :src="inputImageUrl" alt="select file" class="rounded-2xl border"
        :class="twitterBorderColor" />
      <div v-if="inputImageUrl" @click="handleImageCancel"
        class="relative top-0 right-0 cursor-pointer bg-slate-500 h-5 w-5 rounded-full flex items-center justify-center">x
      </div>
      <input @change="handleImageChange" type="file" hidden ref="imageInput" accept="image/png, image/jpeg, image/jpg">
    </div>
    <!-- End of file -->

    <div class="flex items-center justify-between">
      <div class="flex p-2 pl-14">
        <div @click="handleImageClick"
          class="p-2 cursor-pointer text-blue-400 rounded-full hover:bg-blue-50 dark:hover:bg-dim-800">
          <LazyIconsImageframe />
        </div>
        <div class="p-2 cursor-pointer text-blue-400 rounded-full hover:bg-blue-50 dark:hover:bg-dim-800">
          <LazyIconsGifframe />
        </div>
        <div class="p-2 cursor-pointer text-blue-400 rounded-full hover:bg-blue-50 dark:hover:bg-dim-800">
          <LazyIconsEmojiframe />
        </div>
        <div class="p-2 cursor-pointer text-blue-400 rounded-full hover:bg-blue-50 dark:hover:bg-dim-800">
          <LazyIconsChartframe />
        </div>
        <div class="p-2 cursor-pointer text-blue-400 rounded-full hover:bg-blue-50 dark:hover:bg-dim-800">
          <LazyIconsCalanderframe />
        </div>
      </div>

      <div class="pr-5">
        <UiButton @on-click="handleFormSubmit" :disabled="isDisabled">{{ props.buttonLable }}</UiButton>
      </div>
    </div>

  </div>
</template>
<script setup>

const imageInput = ref('')
const text = ref('')
const selectedFile = ref(null)
const inputImageUrl = ref(null)
const isDisabled = computed(() => text.value === '')

const { twitterBorderColor } = useTailwindConfig()
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
})

function handleImageChange(event) {
  selectedFile.value = event.target.files[0]

  const reader = new FileReader()

  reader.onload = (ev) => {
    inputImageUrl.value = ev.target.result
  }
  reader.readAsDataURL(event.target.files[0])
}

function handleImageCancel() {
  selectedFile.value = null
  inputImageUrl.value = null
}

function handleImageClick() {
  imageInput.value.click()
}

function handleFormSubmit() {
  emits('onSubmit', {
    text: text.value,
    mediaFiles: [selectedFile.value],
  })

  handleImageCancel()
  text.value = ''
}

</script>
