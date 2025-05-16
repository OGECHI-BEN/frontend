<template>
  <div class="prose max-w-none">
    <h1>Introduction to HTML</h1>

    <div class="bg-gray-50 p-4 rounded-lg mb-6">
      <h2 class="text-xl font-semibold mb-2">What is HTML?</h2>
      <p>
        HTML (HyperText Markup Language) is the standard markup language for creating web pages and
        web applications. It provides the structure and content of a webpage, while CSS handles the
        presentation and JavaScript adds interactivity.
      </p>
    </div>

    <div class="space-y-6">
      <section>
        <h2>Key Concepts</h2>
        <ul>
          <li><strong>Elements:</strong> The building blocks of HTML pages, represented by tags</li>
          <li>
            <strong>Tags:</strong> Keywords surrounded by angle brackets (e.g., &lt;div&gt;,
            &lt;p&gt;)
          </li>
          <li>
            <strong>Attributes:</strong> Additional information about elements (e.g., class, id,
            src)
          </li>
          <li><strong>Document Structure:</strong> The basic organization of an HTML document</li>
        </ul>
      </section>

      <section>
        <h2>Basic HTML Document Structure</h2>
        <pre class="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
<code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
  &lt;head&gt;
    &lt;title&gt;My First Web Page&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;h1&gt;Hello, World!&lt;/h1&gt;
    &lt;p&gt;This is my first HTML page.&lt;/p&gt;
  &lt;/body&gt;
&lt;/html&gt;</code></pre>
      </section>

      <section>
        <h2>Why Learn HTML?</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="bg-white p-4 rounded-lg shadow">
            <h3 class="text-lg font-semibold mb-2">Foundation of Web Development</h3>
            <p>
              HTML is the fundamental building block of web development. Understanding HTML is
              essential for creating any web content.
            </p>
          </div>
          <div class="bg-white p-4 rounded-lg shadow">
            <h3 class="text-lg font-semibold mb-2">Career Opportunities</h3>
            <p>
              HTML skills are in high demand across various roles in web development, design, and
              content management.
            </p>
          </div>
          <div class="bg-white p-4 rounded-lg shadow">
            <h3 class="text-lg font-semibold mb-2">Easy to Learn</h3>
            <p>
              HTML has a simple syntax and is relatively easy to learn, making it perfect for
              beginners in web development.
            </p>
          </div>
          <div class="bg-white p-4 rounded-lg shadow">
            <h3 class="text-lg font-semibold mb-2">Universal Language</h3>
            <p>
              HTML is a universal language that works across all browsers and platforms, ensuring
              your content is accessible to everyone.
            </p>
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
              <h3 class="text-lg font-semibold mb-2">Basic Structure</h3>
              <p>Learn about HTML document structure, elements, and basic tags.</p>
            </div>
            <div class="relative pl-12">
              <div
                class="absolute left-0 w-8 h-8 bg-orange rounded-full flex items-center justify-center text-white font-bold"
              >
                2
              </div>
              <h3 class="text-lg font-semibold mb-2">Text Formatting</h3>
              <p>Master text elements, headings, paragraphs, and text formatting.</p>
            </div>
            <div class="relative pl-12">
              <div
                class="absolute left-0 w-8 h-8 bg-orange rounded-full flex items-center justify-center text-white font-bold"
              >
                3
              </div>
              <h3 class="text-lg font-semibold mb-2">Links and Images</h3>
              <p>Learn to add hyperlinks and images to your web pages.</p>
            </div>
            <div class="relative pl-12">
              <div
                class="absolute left-0 w-8 h-8 bg-orange rounded-full flex items-center justify-center text-white font-bold"
              >
                4
              </div>
              <h3 class="text-lg font-semibold mb-2">Forms and Input</h3>
              <p>Create interactive forms and handle user input.</p>
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
            params: { language: 'html', level },
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
  name: 'HtmlIntroduction',
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
