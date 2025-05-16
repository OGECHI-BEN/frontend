<template>
  <div class="prose max-w-none">
    <h1>HTML Basic Concepts</h1>

    <div class="space-y-8">
      <!-- HTML Elements -->
      <section>
        <h2>HTML Elements</h2>
        <p>
          HTML elements are the building blocks of HTML pages. They consist of a start tag, content,
          and an end tag. Some elements are self-closing and don't require an end tag.
        </p>

        <div class="bg-gray-50 p-4 rounded-lg">
          <h3 class="text-lg font-semibold mb-2">Common HTML Elements</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-white p-4 rounded-lg shadow">
              <h4 class="font-semibold mb-2">Text Elements</h4>
              <ul class="list-disc pl-5">
                <li>&lt;h1&gt; to &lt;h6&gt; - Headings</li>
                <li>&lt;p&gt; - Paragraphs</li>
                <li>&lt;span&gt; - Inline text</li>
                <li>&lt;strong&gt; - Bold text</li>
                <li>&lt;em&gt; - Italic text</li>
              </ul>
            </div>
            <div class="bg-white p-4 rounded-lg shadow">
              <h4 class="font-semibold mb-2">Container Elements</h4>
              <ul class="list-disc pl-5">
                <li>&lt;div&gt; - Block container</li>
                <li>&lt;section&gt; - Section container</li>
                <li>&lt;article&gt; - Article container</li>
                <li>&lt;header&gt; - Header container</li>
                <li>&lt;footer&gt; - Footer container</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- HTML Attributes -->
      <section>
        <h2>HTML Attributes</h2>
        <p>
          Attributes provide additional information about HTML elements. They are always specified
          in the start tag and usually come in name/value pairs like: name="value".
        </p>

        <div class="bg-gray-50 p-4 rounded-lg">
          <h3 class="text-lg font-semibold mb-2">Common Attributes</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-white p-4 rounded-lg shadow">
              <h4 class="font-semibold mb-2">Global Attributes</h4>
              <ul class="list-disc pl-5">
                <li>class - Specifies CSS classes</li>
                <li>id - Specifies unique ID</li>
                <li>style - Specifies inline CSS</li>
                <li>title - Specifies tooltip text</li>
              </ul>
            </div>
            <div class="bg-white p-4 rounded-lg shadow">
              <h4 class="font-semibold mb-2">Element-Specific Attributes</h4>
              <ul class="list-disc pl-5">
                <li>src - Image source</li>
                <li>href - Link destination</li>
                <li>alt - Image alt text</li>
                <li>type - Input type</li>
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
            <h3 class="text-lg font-semibold mb-2">Basic Text Structure</h3>
            <pre class="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
<code>&lt;h1&gt;Main Heading&lt;/h1&gt;
&lt;h2&gt;Subheading&lt;/h2&gt;
&lt;p&gt;This is a paragraph with &lt;strong&gt;bold&lt;/strong&gt; and &lt;em&gt;italic&lt;/em&gt; text.&lt;/p&gt;</code></pre>
          </div>
          <div>
            <h3 class="text-lg font-semibold mb-2">Container Elements</h3>
            <pre class="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
<code>&lt;div class="container"&gt;
  &lt;header&gt;
    &lt;h1&gt;Website Title&lt;/h1&gt;
  &lt;/header&gt;
  &lt;main&gt;
    &lt;article&gt;
      &lt;h2&gt;Article Title&lt;/h2&gt;
      &lt;p&gt;Article content...&lt;/p&gt;
    &lt;/article&gt;
  &lt;/main&gt;
  &lt;footer&gt;
    &lt;p&gt;Copyright 2024&lt;/p&gt;
  &lt;/footer&gt;
&lt;/div&gt;</code></pre>
          </div>
        </div>
      </section>

      <!-- Practice Exercise -->
      <section>
        <h2>Practice Exercise</h2>
        <div class="bg-white p-6 rounded-lg shadow">
          <h3 class="text-lg font-semibold mb-4">Create a Simple Web Page</h3>
          <p class="mb-4">Create a web page with the following elements:</p>
          <ul class="list-disc pl-5 mb-4">
            <li>A main heading</li>
            <li>Two subheadings</li>
            <li>Three paragraphs</li>
            <li>Use both &lt;strong&gt; and &lt;em&gt; tags</li>
            <li>Organize content using &lt;div&gt; and &lt;section&gt; tags</li>
          </ul>
          <div class="bg-gray-50 p-4 rounded-lg">
            <h4 class="font-semibold mb-2">Your Code:</h4>
            <textarea
              class="w-full h-48 p-4 font-mono text-sm bg-gray-800 text-white rounded-lg"
              placeholder="Write your HTML code here..."
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
            params: { language: 'html', level },
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
            params: { language: 'html', level },
            query: { section: 'elements' },
          })
        "
        class="bg-orange text-white px-6 py-2 rounded-lg hover:bg-gold transition-colors"
      >
        Next: HTML Elements →
      </button>
    </div>
  </div>
</template>

<script setup>
defineOptions({
  name: 'HtmlBasics',
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
