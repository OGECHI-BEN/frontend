<template>
  <div class="prose max-w-none">
    <h1>Introduction to Python</h1>

    <div class="bg-gray-50 p-4 rounded-lg mb-6">
      <h2 class="text-xl font-semibold mb-2">What is Python?</h2>
      <p>
        Python is a high-level, interpreted programming language known for its simplicity and
        readability. It's widely used in web development, data science, artificial intelligence, and
        automation.
      </p>
    </div>

    <div class="space-y-6">
      <section>
        <h2>Key Features</h2>
        <ul>
          <li><strong>Readable Syntax:</strong> Python's syntax is clean and easy to understand</li>
          <li>
            <strong>Versatile:</strong> Can be used for web development, data analysis, AI, and more
          </li>
          <li><strong>Large Ecosystem:</strong> Extensive libraries and frameworks available</li>
          <li><strong>Cross-platform:</strong> Runs on Windows, macOS, Linux, and more</li>
        </ul>
      </section>

      <section>
        <h2>Your First Python Program</h2>
        <pre class="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
<code># This is a simple Python program
print("Hello, World!")

# Variables and basic operations
name = "Python"
version = 3.9
print(f"Welcome to {name} {version}")</code></pre>
      </section>

      <section>
        <h2>Why Learn Python?</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="bg-white p-4 rounded-lg shadow">
            <h3 class="text-lg font-semibold mb-2">Beginner Friendly</h3>
            <p>Python's simple syntax makes it perfect for beginners in programming.</p>
          </div>
          <div class="bg-white p-4 rounded-lg shadow">
            <h3 class="text-lg font-semibold mb-2">High Demand</h3>
            <p>Python developers are in high demand across various industries.</p>
          </div>
          <div class="bg-white p-4 rounded-lg shadow">
            <h3 class="text-lg font-semibold mb-2">Versatile</h3>
            <p>Use Python for web development, data science, AI, automation, and more.</p>
          </div>
          <div class="bg-white p-4 rounded-lg shadow">
            <h3 class="text-lg font-semibold mb-2">Strong Community</h3>
            <p>Access to a large community and extensive documentation.</p>
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
              <h3 class="text-lg font-semibold mb-2">Python Basics</h3>
              <p>Learn about variables, data types, and basic operations.</p>
            </div>
            <div class="relative pl-12">
              <div
                class="absolute left-0 w-8 h-8 bg-orange rounded-full flex items-center justify-center text-white font-bold"
              >
                2
              </div>
              <h3 class="text-lg font-semibold mb-2">Control Flow</h3>
              <p>Master conditionals, loops, and program flow control.</p>
            </div>
            <div class="relative pl-12">
              <div
                class="absolute left-0 w-8 h-8 bg-orange rounded-full flex items-center justify-center text-white font-bold"
              >
                3
              </div>
              <h3 class="text-lg font-semibold mb-2">Functions & Modules</h3>
              <p>Learn to write reusable code and organize your programs.</p>
            </div>
            <div class="relative pl-12">
              <div
                class="absolute left-0 w-8 h-8 bg-orange rounded-full flex items-center justify-center text-white font-bold"
              >
                4
              </div>
              <h3 class="text-lg font-semibold mb-2">Data Structures</h3>
              <p>Work with lists, dictionaries, and other data structures.</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2>Getting Started</h2>
        <div class="bg-white p-6 rounded-lg shadow">
          <h3 class="text-lg font-semibold mb-4">Setting Up Your Environment</h3>
          <ol class="list-decimal pl-5 space-y-2">
            <li>
              Download and install Python from
              <a href="https://python.org" class="text-orange hover:text-gold">python.org</a>
            </li>
            <li>Choose a code editor (VS Code, PyCharm, etc.)</li>
            <li>Create your first Python file with a .py extension</li>
            <li>Start coding!</li>
          </ol>
        </div>
      </section>
    </div>

    <div class="mt-8 flex justify-between">
      <button
        @click="
          $router.push({
            name: 'content',
            params: { language: 'python', level },
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
  name: 'PythonIntroduction',
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
