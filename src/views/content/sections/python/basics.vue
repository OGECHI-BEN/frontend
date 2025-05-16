<template>
  <div class="prose max-w-none">
    <h1>Python Basic Concepts</h1>

    <div class="space-y-8">
      <!-- Variables and Data Types -->
      <section>
        <h2>Variables and Data Types</h2>
        <p>
          In Python, variables are containers for storing data values. Python has several built-in
          data types that you'll use frequently in your programs.
        </p>

        <div class="bg-gray-50 p-4 rounded-lg">
          <h3 class="text-lg font-semibold mb-2">Basic Data Types</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-white p-4 rounded-lg shadow">
              <h4 class="font-semibold mb-2">Numbers</h4>
              <ul class="list-disc pl-5">
                <li><code>int</code> - Integer numbers</li>
                <li><code>float</code> - Decimal numbers</li>
                <li><code>complex</code> - Complex numbers</li>
              </ul>
            </div>
            <div class="bg-white p-4 rounded-lg shadow">
              <h4 class="font-semibold mb-2">Text</h4>
              <ul class="list-disc pl-5">
                <li><code>str</code> - String (text)</li>
                <li><code>bool</code> - Boolean (True/False)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- Operators -->
      <section>
        <h2>Operators</h2>
        <p>
          Operators are used to perform operations on variables and values. Python has various types
          of operators.
        </p>

        <div class="bg-gray-50 p-4 rounded-lg">
          <h3 class="text-lg font-semibold mb-2">Common Operators</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-white p-4 rounded-lg shadow">
              <h4 class="font-semibold mb-2">Arithmetic Operators</h4>
              <ul class="list-disc pl-5">
                <li><code>+</code> - Addition</li>
                <li><code>-</code> - Subtraction</li>
                <li><code>*</code> - Multiplication</li>
                <li><code>/</code> - Division</li>
                <li><code>%</code> - Modulus</li>
                <li><code>**</code> - Exponentiation</li>
              </ul>
            </div>
            <div class="bg-white p-4 rounded-lg shadow">
              <h4 class="font-semibold mb-2">Comparison Operators</h4>
              <ul class="list-disc pl-5">
                <li><code>==</code> - Equal to</li>
                <li><code>!=</code> - Not equal to</li>
                <li><code>&gt;</code> - Greater than</li>
                <li><code>&lt;</code> - Less than</li>
                <li><code>&gt;=</code> - Greater than or equal to</li>
                <li><code>&lt;=</code> - Less than or equal to</li>
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
            <h3 class="text-lg font-semibold mb-2">Variables and Data Types</h3>
            <pre class="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
<code># Numbers
age = 25          # integer
height = 1.75     # float
complex_num = 1 + 2j  # complex

# Strings
name = "Python"
message = 'Hello, World!'

# Boolean
is_student = True
is_working = False

# Type conversion
str_age = str(age)        # Convert to string
int_height = int(height)  # Convert to integer</code></pre>
          </div>
          <div>
            <h3 class="text-lg font-semibold mb-2">Operators</h3>
            <pre class="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
<code># Arithmetic operations
x = 10
y = 3

addition = x + y      # 13
subtraction = x - y   # 7
multiplication = x * y  # 30
division = x / y      # 3.333...
modulus = x % y       # 1
power = x ** y        # 1000

# Comparison
is_equal = x == y     # False
is_greater = x > y    # True
is_less = x < y       # False</code></pre>
          </div>
        </div>
      </section>

      <!-- Practice Exercise -->
      <section>
        <h2>Practice Exercise</h2>
        <div class="bg-white p-6 rounded-lg shadow">
          <h3 class="text-lg font-semibold mb-4">Temperature Converter</h3>
          <p class="mb-4">
            Create a program that converts Celsius to Fahrenheit. Use the formula: F = (C * 9/5) +
            32
          </p>
          <div class="bg-gray-50 p-4 rounded-lg">
            <h4 class="font-semibold mb-2">Your Code:</h4>
            <textarea
              class="w-full h-48 p-4 font-mono text-sm bg-gray-800 text-white rounded-lg"
              placeholder="Write your Python code here..."
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
            params: { language: 'python', level },
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
            params: { language: 'python', level },
            query: { section: 'control-flow' },
          })
        "
        class="bg-orange text-white px-6 py-2 rounded-lg hover:bg-gold transition-colors"
      >
        Next: Control Flow →
      </button>
    </div>
  </div>
</template>

<script setup>
defineOptions({
  name: 'PythonBasics',
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
