<template>
  <div class="lesson-content">
    <h2>HTML Elements and Tags</h2>

    <section class="content-section">
      <h3>Introduction to HTML Elements</h3>
      <p>
        HTML elements are the building blocks of HTML pages. They are represented by tags and can
        contain content, other elements, or both.
      </p>

      <div class="code-example">
        <pre><code class="language-html">
&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;My First HTML Page&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;h1&gt;Hello, World!&lt;/h1&gt;
    &lt;p&gt;This is a paragraph.&lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;
        </code></pre>
      </div>
    </section>

    <section class="content-section">
      <h3>Common HTML Elements</h3>
      <ul class="element-list">
        <li>
          <code>&lt;h1&gt; to &lt;h6&gt;</code>
          <p>Headings of different levels</p>
        </li>
        <li>
          <code>&lt;p&gt;</code>
          <p>Paragraphs of text</p>
        </li>
        <li>
          <code>&lt;a&gt;</code>
          <p>Hyperlinks</p>
        </li>
        <li>
          <code>&lt;img&gt;</code>
          <p>Images</p>
        </li>
      </ul>
    </section>

    <section class="content-section">
      <h3>Practice Exercise</h3>
      <div class="exercise">
        <p>Create a simple HTML page with:</p>
        <ul>
          <li>A main heading</li>
          <li>Two paragraphs</li>
          <li>A link to your favorite website</li>
          <li>An image</li>
        </ul>

        <div class="code-playground">
          <div class="editor">
            <textarea
              v-model="userCode"
              @input="updatePreview"
              placeholder="Write your HTML code here..."
            ></textarea>
          </div>
          <div class="preview">
            <iframe :srcdoc="previewCode" sandbox="allow-scripts"></iframe>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const userCode = ref('')
const previewCode = computed(() => userCode.value)
</script>

<style scoped>
.lesson-content {
  @apply max-w-4xl mx-auto p-6;
}

.content-section {
  @apply mb-8;
}

h2 {
  @apply text-3xl font-bold mb-6;
}

h3 {
  @apply text-2xl font-semibold mb-4;
}

p {
  @apply text-gray-700 mb-4;
}

.code-example {
  @apply bg-gray-100 rounded-lg p-4 mb-6;
}

.element-list {
  @apply space-y-4;
}

.element-list li {
  @apply flex items-start gap-4;
}

.element-list code {
  @apply bg-gray-100 px-2 py-1 rounded text-sm font-mono;
}

.exercise {
  @apply bg-blue-50 rounded-lg p-6;
}

.code-playground {
  @apply grid grid-cols-2 gap-4 mt-4;
}

.editor textarea {
  @apply w-full h-64 p-4 font-mono text-sm border rounded-lg;
}

.preview iframe {
  @apply w-full h-64 border rounded-lg bg-white;
}
</style>
