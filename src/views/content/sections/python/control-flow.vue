<template>
  <div class="prose max-w-none">
    <h1>Python Control Flow</h1>

    <div class="space-y-8">
      <!-- Conditionals -->
      <section>
        <h2>Conditional Statements</h2>
        <p>
          Conditional statements allow your program to make decisions based on certain conditions.
          Python uses if, elif, and else statements for this purpose.
        </p>

        <div class="bg-gray-50 p-4 rounded-lg">
          <h3 class="text-lg font-semibold mb-2">Basic Conditional Structure</h3>
          <pre class="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
<code># Simple if statement
age = 18
if age >= 18:
    print("You are an adult")

# if-else statement
temperature = 25
if temperature > 30:
    print("It's hot outside")
else:
    print("It's not too hot")

# if-elif-else statement
score = 85
if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
else:
    grade = "F"
print(f"Your grade is {grade}")</code></pre>
        </div>
      </section>

      <!-- Loops -->
      <section>
        <h2>Loops</h2>
        <p>
          Loops are used to execute a block of code multiple times. Python has two main types of
          loops: for loops and while loops.
        </p>

        <div class="bg-gray-50 p-4 rounded-lg">
          <h3 class="text-lg font-semibold mb-2">For Loops</h3>
          <pre class="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
<code># Iterating over a range
for i in range(5):
    print(i)  # Prints 0 to 4

# Iterating over a list
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)

# Using enumerate
for index, fruit in enumerate(fruits):
    print(f"{index}: {fruit}")</code></pre>

          <h3 class="text-lg font-semibold mb-2 mt-4">While Loops</h3>
          <pre class="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
<code># Basic while loop
count = 0
while count < 5:
    print(count)
    count += 1

# Using break and continue
while True:
    user_input = input("Enter a number (or 'quit' to exit): ")
    if user_input == 'quit':
        break
    if not user_input.isdigit():
        continue
    print(f"You entered: {user_input}")</code></pre>
        </div>
      </section>

      <!-- Code Examples -->
      <section>
        <h2>Practical Examples</h2>
        <div class="space-y-4">
          <div>
            <h3 class="text-lg font-semibold mb-2">Number Guessing Game</h3>
            <pre class="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
<code>import random

# Generate a random number between 1 and 100
secret_number = random.randint(1, 100)
attempts = 0

while attempts < 5:
    guess = int(input("Guess the number (1-100): "))
    attempts += 1

    if guess < secret_number:
        print("Too low!")
    elif guess > secret_number:
        print("Too high!")
    else:
        print(f"Congratulations! You guessed it in {attempts} attempts!")
        break
else:
    print(f"Game over! The number was {secret_number}")</code></pre>
          </div>
        </div>
      </section>

      <!-- Practice Exercise -->
      <section>
        <h2>Practice Exercise</h2>
        <div class="bg-white p-6 rounded-lg shadow">
          <h3 class="text-lg font-semibold mb-4">FizzBuzz Challenge</h3>
          <p class="mb-4">
            Write a program that prints numbers from 1 to 100. But for multiples of 3, print "Fizz"
            instead of the number, and for multiples of 5, print "Buzz". For numbers that are
            multiples of both 3 and 5, print "FizzBuzz".
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
            query: { section: 'basics' },
          })
        "
        class="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
      >
        ← Previous: Basic Concepts
      </button>
      <button
        @click="
          $router.push({
            name: 'content',
            params: { language: 'python', level },
            query: { section: 'functions' },
          })
        "
        class="bg-orange text-white px-6 py-2 rounded-lg hover:bg-gold transition-colors"
      >
        Next: Functions →
      </button>
    </div>
  </div>
</template>

<script setup>
defineOptions({
  name: 'PythonControlFlow',
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
