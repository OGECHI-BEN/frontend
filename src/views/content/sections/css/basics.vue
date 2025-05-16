<template>
  <div class="prose max-w-none">
    <h1>CSS Basic Concepts</h1>

    <div class="space-y-8">
      <!-- Selectors -->
      <section>
        <h2>CSS Selectors</h2>
        <p>
          Selectors are patterns used to select and style HTML elements. They are the first part of
          a CSS rule and determine which elements the styles will be applied to.
        </p>

        <div class="bg-gray-50 p-4 rounded-lg">
          <h3 class="text-lg font-semibold mb-2">Common Selectors</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-white p-4 rounded-lg shadow">
              <h4 class="font-semibold mb-2">Basic Selectors</h4>
              <ul class="list-disc pl-5">
                <li>Element: <code>p</code></li>
                <li>Class: <code>.class-name</code></li>
                <li>ID: <code>#id-name</code></li>
                <li>Universal: <code>*</code></li>
              </ul>
            </div>
            <div class="bg-white p-4 rounded-lg shadow">
              <h4 class="font-semibold mb-2">Combination Selectors</h4>
              <ul class="list-disc pl-5">
                <li>Descendant: <code>div p</code></li>
                <li>Child: <code>div > p</code></li>
                <li>Adjacent: <code>div + p</code></li>
                <li>Multiple: <code>div, p</code></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- Properties -->
      <section>
        <h2>Common CSS Properties</h2>
        <p>
          CSS properties define the visual characteristics of elements. Here are some of the most
          commonly used properties.
        </p>

        <div class="bg-gray-50 p-4 rounded-lg">
          <h3 class="text-lg font-semibold mb-2">Text Properties</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-white p-4 rounded-lg shadow">
              <h4 class="font-semibold mb-2">Typography</h4>
              <ul class="list-disc pl-5">
                <li><code>color</code> - Text color</li>
                <li><code>font-size</code> - Text size</li>
                <li><code>font-family</code> - Font type</li>
                <li><code>font-weight</code> - Text boldness</li>
              </ul>
            </div>
            <div class="bg-white p-4 rounded-lg shadow">
              <h4 class="font-semibold mb-2">Text Layout</h4>
              <ul class="list-disc pl-5">
                <li><code>text-align</code> - Text alignment</li>
                <li><code>line-height</code> - Line spacing</li>
                <li><code>text-decoration</code> - Underline, etc.</li>
                <li><code>text-transform</code> - Case transformation</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- Box Model -->
      <section>
        <h2>Box Model</h2>
        <p>
          The CSS box model describes how elements are sized and spaced. Every element is a
          rectangular box with content, padding, border, and margin.
        </p>

        <div class="bg-gray-50 p-4 rounded-lg">
          <h3 class="text-lg font-semibold mb-2">Box Model Properties</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-white p-4 rounded-lg shadow">
              <h4 class="font-semibold mb-2">Spacing</h4>
              <ul class="list-disc pl-5">
                <li><code>margin</code> - Outer spacing</li>
                <li><code>padding</code> - Inner spacing</li>
                <li><code>border</code> - Border around element</li>
                <li><code>width/height</code> - Content size</li>
              </ul>
            </div>
            <div class="bg-white p-4 rounded-lg shadow">
              <h4 class="font-semibold mb-2">Box Sizing</h4>
              <ul class="list-disc pl-5">
                <li><code>box-sizing</code> - How size is calculated</li>
                <li><code>display</code> - How element behaves</li>
                <li><code>position</code> - Element positioning</li>
                <li><code>overflow</code> - Content overflow</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- Code Examples -->
      <section>
        <h2>Code Examples</h2>
        <div class="space-y-4">
          <div>
            <h3 class="text-lg font-semibold mb-2">Basic Styling</h3>
            <pre class="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
<code>/* Select elements by class */
.button {
  color: white;
  background-color: blue;
  padding: 10px 20px;
  border-radius: 5px;
}

/* Select elements by ID */
#header {
  font-size: 24px;
  margin-bottom: 20px;
}

/* Select multiple elements */
h1, h2, h3 {
  font-family: Arial, sans-serif;
  color: #333;
}</code></pre>
          </div>
          <div>
            <h3 class="text-lg font-semibold mb-2">Box Model Example</h3>
            <pre class="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
<code>.card {
  width: 300px;
  padding: 20px;
  margin: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}</code></pre>
          </div>
        </div>
      </section>

      <!-- Practice Exercise -->
      <section>
        <h2>Practice Exercise</h2>
        <div class="bg-white p-6 rounded-lg shadow">
          <h3 class="text-lg font-semibold mb-4">Style a Card Component</h3>
          <p class="mb-4">Create a card component with the following styles:</p>
          <ul class="list-disc pl-5 mb-4">
            <li>Width of 300px</li>
            <li>Padding of 20px</li>
            <li>Light gray background</li>
            <li>Rounded corners</li>
            <li>Shadow effect</li>
            <li>Centered text</li>
          </ul>
          <div class="bg-gray-50 p-4 rounded-lg">
            <h4 class="font-semibold mb-2">Your Code:</h4>
            <textarea
              class="w-full h-48 p-4 font-mono text-sm bg-gray-800 text-white rounded-lg"
              placeholder="Write your CSS code here..."
            ></textarea>
          </div>
          <button
            class="mt-4 bg-orange text-white px-6 py-2 rounded-lg hover:bg-gold transition-colors"
          >
            Check Solution
          </button>
        </div>
      </section>
    </div>

    <div class="mt-8 flex justify-between">
      <button
        @click="
          $router.push({
            name: 'content',
            params: { language: 'css', level },
            query: { section: 'introduction' },
          })
        "
        class="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
      >
        ← Previous: Introduction
      </button>
      <button
        @click="
          $router.push({
            name: 'content',
            params: { language: 'css', level },
            query: { section: 'selectors' },
          })
        "
        class="bg-orange text-white px-6 py-2 rounded-lg hover:bg-gold transition-colors"
      >
        Next: CSS Selectors →
      </button>
    </div>
  </div>
</template>

<script setup>
defineOptions({
  name: 'CssBasics',
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
