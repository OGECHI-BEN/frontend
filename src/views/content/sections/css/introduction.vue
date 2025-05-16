<template>
  <div class="prose max-w-none">
    <h1>Introduction to CSS</h1>

    <div class="bg-gray-50 p-4 rounded-lg mb-6">
      <h2 class="text-xl font-semibold mb-2">What is CSS?</h2>
      <p>
        CSS (Cascading Style Sheets) is a style sheet language used for describing the presentation
        of a document written in HTML. CSS describes how elements should be rendered on screen, on
        paper, or in other media.
      </p>
    </div>

    <div class="space-y-6">
      <section>
        <h2>Key Concepts</h2>
        <ul>
          <li><strong>Selectors:</strong> Patterns used to select and style HTML elements</li>
          <li>
            <strong>Properties:</strong> The visual characteristics you want to change (e.g., color,
            size, position)
          </li>
          <li><strong>Values:</strong> The specific settings for each property</li>
          <li>
            <strong>Cascade:</strong> The way CSS rules are applied based on specificity and order
          </li>
        </ul>
      </section>

      <section>
        <h2>Basic CSS Syntax</h2>
        <pre class="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
<code>selector {
  property: value;
  property: value;
}</code></pre>
        <div class="mt-4">
          <h3 class="text-lg font-semibold mb-2">Example:</h3>
          <pre class="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
<code>h1 {
  color: blue;
  font-size: 24px;
  margin-bottom: 20px;
}</code></pre>
        </div>
      </section>

      <section>
        <h2>Why Learn CSS?</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="bg-white p-4 rounded-lg shadow">
            <h3 class="text-lg font-semibold mb-2">Visual Design</h3>
            <p>CSS allows you to create beautiful, responsive, and interactive web designs.</p>
          </div>
          <div class="bg-white p-4 rounded-lg shadow">
            <h3 class="text-lg font-semibold mb-2">User Experience</h3>
            <p>Good CSS implementation leads to better user experience and accessibility.</p>
          </div>
          <div class="bg-white p-4 rounded-lg shadow">
            <h3 class="text-lg font-semibold mb-2">Career Growth</h3>
            <p>CSS skills are essential for front-end development and web design careers.</p>
          </div>
          <div class="bg-white p-4 rounded-lg shadow">
            <h3 class="text-lg font-semibold mb-2">Modern Web</h3>
            <p>CSS is constantly evolving with new features for modern web development.</p>
          </div>
        </div>
      </section>

      <section>
        <h2>Learning Path</h2>
        <div class="relative">
          <div class="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
          <div class="space-y-8">
            <div class="relative pl-12">
              <div
                class="absolute left-0 w-8 h-8 bg-orange rounded-full flex items-center justify-center text-white font-bold"
              >
                1
              </div>
              <h3 class="text-lg font-semibold mb-2">Selectors & Properties</h3>
              <p>Learn how to select elements and apply basic styling properties.</p>
            </div>
            <div class="relative pl-12">
              <div
                class="absolute left-0 w-8 h-8 bg-orange rounded-full flex items-center justify-center text-white font-bold"
              >
                2
              </div>
              <h3 class="text-lg font-semibold mb-2">Box Model</h3>
              <p>Understand how elements are sized and spaced on the page.</p>
            </div>
            <div class="relative pl-12">
              <div
                class="absolute left-0 w-8 h-8 bg-orange rounded-full flex items-center justify-center text-white font-bold"
              >
                3
              </div>
              <h3 class="text-lg font-semibold mb-2">Layout</h3>
              <p>Master different layout techniques including Flexbox and Grid.</p>
            </div>
            <div class="relative pl-12">
              <div
                class="absolute left-0 w-8 h-8 bg-orange rounded-full flex items-center justify-center text-white font-bold"
              >
                4
              </div>
              <h3 class="text-lg font-semibold mb-2">Responsive Design</h3>
              <p>Learn to create designs that work across different screen sizes.</p>
            </div>
          </div>
        </div>
      </section>
    </div>

    <div class="mt-8 flex justify-between">
      <button
        @click="
          $router.push({
            name: 'content',
            params: { language: 'css', level },
            query: { section: 'basics' },
          })
        "
        class="bg-orange text-white px-6 py-2 rounded-lg hover:bg-gold transition-colors"
      >
        Next: Basic Concepts →
      </button>
    </div>
  </div>
</template>

<script setup>
defineOptions({
  name: 'CssIntroduction',
})

defineProps({
  language: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
  section: {
    type: String,
    required: true,
  },
})
</script>
