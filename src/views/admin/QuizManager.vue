<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-8">
      <div class="flex items-center justify-between mb-8">
        <h1 class="text-3xl font-bold text-gray-800">Quiz Manager</h1>
        <button
          @click="openQuestionModal()"
          class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          Add New Question
        </button>
      </div>

      <!-- Filters -->
      <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Language</label>
            <select
              v-model="filters.language"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">All Languages</option>
              <option value="html">HTML</option>
              <option value="css">CSS</option>
              <option value="python">Python</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
            <select
              v-model="filters.difficulty"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="expert">Expert</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <input
              v-model="filters.search"
              type="text"
              placeholder="Search questions..."
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
      </div>

      <!-- Questions Table -->
      <div class="bg-white rounded-lg shadow-lg overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Question
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Language
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Difficulty
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Points
              </th>
              <th
                class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="question in filteredQuestions" :key="question.id">
              <td class="px-6 py-4 whitespace-normal">
                <div class="text-sm text-gray-900">{{ question.text }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800"
                >
                  {{ question.language }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                  :class="{
                    'bg-green-100 text-green-800': question.difficulty === 'beginner',
                    'bg-yellow-100 text-yellow-800': question.difficulty === 'intermediate',
                    'bg-red-100 text-red-800': question.difficulty === 'expert',
                  }"
                >
                  {{ question.difficulty }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ question.points }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  @click="openQuestionModal(question)"
                  class="text-indigo-600 hover:text-indigo-900 mr-4"
                >
                  Edit
                </button>
                <button
                  @click="deleteQuestion(question.id)"
                  class="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Question Modal -->
      <div
        v-if="showModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
      >
        <div class="bg-white rounded-lg shadow-xl w-full max-w-2xl">
          <div class="p-6">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-2xl font-bold">
                {{ editingQuestion ? 'Edit Question' : 'Add New Question' }}
              </h2>
              <button @click="showModal = false" class="text-gray-500 hover:text-gray-700">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <form @submit.prevent="saveQuestion" class="space-y-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Question Text</label>
                <textarea
                  v-model="questionForm.text"
                  rows="3"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                ></textarea>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Language</label>
                  <select
                    v-model="questionForm.language"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  >
                    <option value="html">HTML</option>
                    <option value="css">CSS</option>
                    <option value="python">Python</option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
                  <select
                    v-model="questionForm.difficulty"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="expert">Expert</option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Points</label>
                  <input
                    v-model.number="questionForm.points"
                    type="number"
                    min="1"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Options</label>
                <div class="space-y-4">
                  <div
                    v-for="(option, index) in questionForm.options"
                    :key="index"
                    class="flex items-center space-x-4"
                  >
                    <input
                      v-model="questionForm.options[index]"
                      type="text"
                      class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      :placeholder="'Option ' + (index + 1)"
                      required
                    />
                    <button
                      type="button"
                      @click="removeOption(index)"
                      class="text-red-600 hover:text-red-900"
                      :disabled="questionForm.options.length <= 2"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  @click="addOption"
                  class="mt-4 text-indigo-600 hover:text-indigo-900"
                >
                  Add Option
                </button>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Correct Answer</label>
                <select
                  v-model="questionForm.correct"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                >
                  <option
                    v-for="(option, index) in questionForm.options"
                    :key="index"
                    :value="option"
                  >
                    {{ option }}
                  </option>
                </select>
              </div>

              <div class="flex justify-end space-x-4">
                <button
                  type="button"
                  @click="showModal = false"
                  class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                >
                  {{ editingQuestion ? 'Update Question' : 'Add Question' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const filters = ref({
  language: '',
  difficulty: '',
  search: '',
})

const questions = ref([
  {
    id: 1,
    text: 'What is the correct HTML element for the largest heading?',
    language: 'html',
    difficulty: 'beginner',
    points: 10,
    options: ['<h1>', '<heading>', '<head>', '<h6>'],
    correct: '<h1>',
  },
  {
    id: 2,
    text: 'Which CSS property is used to change the text color?',
    language: 'css',
    difficulty: 'beginner',
    points: 10,
    options: ['text-color', 'color', 'font-color', 'text-style'],
    correct: 'color',
  },
])

const showModal = ref(false)
const editingQuestion = ref(null)
const questionForm = ref({
  text: '',
  language: 'html',
  difficulty: 'beginner',
  points: 10,
  options: ['', ''],
  correct: '',
})

const filteredQuestions = computed(() => {
  return questions.value.filter((question) => {
    if (filters.value.language && question.language !== filters.value.language) {
      return false
    }
    if (filters.value.difficulty && question.difficulty !== filters.value.difficulty) {
      return false
    }
    if (filters.value.search) {
      const searchLower = filters.value.search.toLowerCase()
      return (
        question.text.toLowerCase().includes(searchLower) ||
        question.language.toLowerCase().includes(searchLower) ||
        question.difficulty.toLowerCase().includes(searchLower)
      )
    }
    return true
  })
})

const openQuestionModal = (question = null) => {
  editingQuestion.value = question
  if (question) {
    questionForm.value = { ...question }
  } else {
    questionForm.value = {
      text: '',
      language: 'html',
      difficulty: 'beginner',
      points: 10,
      options: ['', ''],
      correct: '',
    }
  }
  showModal.value = true
}

const addOption = () => {
  questionForm.value.options.push('')
}

const removeOption = (index) => {
  questionForm.value.options.splice(index, 1)
  if (questionForm.value.correct === questionForm.value.options[index]) {
    questionForm.value.correct = ''
  }
}

const saveQuestion = async () => {
  try {
    if (editingQuestion.value) {
      // Update existing question
      const index = questions.value.findIndex((q) => q.id === editingQuestion.value.id)
      questions.value[index] = {
        ...editingQuestion.value,
        ...questionForm.value,
      }
    } else {
      // Add new question
      questions.value.push({
        id: questions.value.length + 1,
        ...questionForm.value,
      })
    }
    showModal.value = false
  } catch (error) {
    console.error('Failed to save question:', error)
  }
}

const deleteQuestion = async (id) => {
  if (!confirm('Are you sure you want to delete this question?')) return

  try {
    questions.value = questions.value.filter((q) => q.id !== id)
  } catch (error) {
    console.error('Failed to delete question:', error)
  }
}
</script>
