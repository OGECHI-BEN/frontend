<template>
  <div class="code-editor-container">
    <div ref="editorContainer" class="h-[500px] w-full border border-gray-700 rounded-lg"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { initMonaco, monaco } from '../../utils/monaco'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  language: {
    type: String,
    default: 'javascript',
  },
  theme: {
    type: String,
    default: 'vs-dark',
  },
  readOnly: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue', 'change'])

const editorContainer = ref(null)
let editor = null

onMounted(async () => {
  if (editorContainer.value) {
    // Initialize Monaco editor
    editor = await initMonaco(editorContainer.value, {
      value: props.modelValue,
      language: props.language,
      theme: props.theme,
      readOnly: props.readOnly,
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      fontSize: 14,
      lineNumbers: 'on',
      roundedSelection: false,
      scrollbar: {
        vertical: 'visible',
        horizontal: 'visible',
        useShadows: false,
        verticalScrollbarSize: 10,
        horizontalScrollbarSize: 10,
      },
    })

    // Set up change listener
    editor.onDidChangeModelContent(() => {
      const value = editor.getValue()
      emit('update:modelValue', value)
      emit('change', value)
    })
  }
})

// Watch for prop changes
watch(
  () => props.modelValue,
  (newValue) => {
    if (editor && newValue !== editor.getValue()) {
      editor.setValue(newValue)
    }
  },
)

watch(
  () => props.language,
  (newValue) => {
    if (editor) {
      monaco.editor.setModelLanguage(editor.getModel(), newValue)
    }
  },
)

watch(
  () => props.theme,
  (newValue) => {
    if (editor) {
      monaco.editor.setTheme(newValue)
    }
  },
)

watch(
  () => props.readOnly,
  (newValue) => {
    if (editor) {
      editor.updateOptions({ readOnly: newValue })
    }
  },
)

// Clean up
onBeforeUnmount(() => {
  if (editor) {
    editor.dispose()
  }
})
</script>

<style scoped>
.code-editor-container {
  @apply w-full h-full;
}
</style>
