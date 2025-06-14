<template>
  <div class="code-editor-container">
    <textarea
      class="w-full h-48 bg-gray-700 text-white p-4 rounded-md font-mono text-sm"
      v-model="userCode"
      placeholder="Write your code here..."
    ></textarea>
    <button
      @click="submitCode"
      class="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
    >
      Run Tests & Submit
    </button>
    <div v-if="feedback" class="mt-2 text-sm">
      <p :class="{ 'text-green-500': feedback.isCorrect, 'text-red-500': !feedback.isCorrect }">
        {{ feedback.message }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  starterCode: {
    type: String,
    default: '',
  },
  exerciseId: {
    type: Number,
    required: true,
  },
})

const emit = defineEmits(['submit-code'])

const userCode = ref(props.starterCode)
const feedback = ref(null) // To store feedback from submission

watch(
  () => props.starterCode,
  (newCode) => {
    userCode.value = newCode
  },
)

const submitCode = () => {
  emit('submit-code', {
    exerciseId: props.exerciseId,
    code: userCode.value,
  })
}

// Function to update feedback from parent component
const setFeedback = (isCorrect, message) => {
  feedback.value = { isCorrect, message }
}

defineExpose({
  setFeedback,
})
</script>

<style scoped>
/* Add any specific styles for the code editor here */
</style>
