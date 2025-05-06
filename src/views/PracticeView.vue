<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Introduction Section -->
    <section class="mb-12 text-center">
      <h1 class="text-4xl font-bold text-gold mb-4">Practice Your Coding Skills</h1>
      <p class="text-xl text-primary max-w-3xl mx-auto">
        Put your knowledge to the test with our comprehensive practice exercises. From basic syntax
        checking to complex problem-solving, our practice platform helps you build real-world coding
        skills.
      </p>
    </section>

    <!-- How Our Practice System Works Section -->
    <section class="mb-16 bg-tertiary p-8 rounded-lg">
      <h2 class="text-3xl font-bold text-gold mb-6">How Our Practice System Works</h2>
      <div class="grid md:grid-cols-4 gap-6">
        <div class="bg-secondary p-6 rounded-lg">
          <div
            class="w-12 h-12 bg-orange rounded-full flex items-center justify-center text-white text-xl font-bold mb-4"
          >
            1
          </div>
          <h3 class="text-xl font-semibold text-orange mb-3">Choose Your Language</h3>
          <p class="text-primary">Select from HTML, CSS, or Python at your current skill level.</p>
        </div>
        <div class="bg-secondary p-6 rounded-lg">
          <div
            class="w-12 h-12 bg-orange rounded-full flex items-center justify-center text-white text-xl font-bold mb-4"
          >
            2
          </div>
          <h3 class="text-xl font-semibold text-orange mb-3">Tackle Challenges</h3>
          <p class="text-primary">
            Solve problems that reinforce concepts from your learning path.
          </p>
        </div>
        <div class="bg-secondary p-6 rounded-lg">
          <div
            class="w-12 h-12 bg-orange rounded-full flex items-center justify-center text-white text-xl font-bold mb-4"
          >
            3
          </div>
          <h3 class="text-xl font-semibold text-orange mb-3">Get Feedback</h3>
          <p class="text-primary">Receive immediate results and explanations for your solutions.</p>
        </div>
        <div class="bg-secondary p-6 rounded-lg">
          <div
            class="w-12 h-12 bg-orange rounded-full flex items-center justify-center text-white text-xl font-bold mb-4"
          >
            4
          </div>
          <h3 class="text-xl font-semibold text-orange mb-3">Level Up</h3>
          <p class="text-primary">Track your progress and advance to more complex challenges.</p>
        </div>
      </div>
    </section>

    <!-- Points and Leveling System Section -->
    <section class="mb-16 bg-tertiary p-8 rounded-lg">
      <h2 class="text-3xl font-bold text-gold mb-6">Points and Leveling System</h2>
      <div class="grid md:grid-cols-3 gap-8">
        <div class="bg-secondary p-6 rounded-lg">
          <h3 class="text-xl font-semibold text-orange mb-3">Earn Points</h3>
          <p class="text-primary">
            Complete exercises and challenges to earn points based on difficulty and accuracy.
          </p>
        </div>
        <div class="bg-secondary p-6 rounded-lg">
          <h3 class="text-xl font-semibold text-orange mb-3">Track Progress</h3>
          <p class="text-primary">
            Monitor your improvement with detailed statistics and performance metrics.
          </p>
        </div>
        <div class="bg-secondary p-6 rounded-lg">
          <h3 class="text-xl font-semibold text-orange mb-3">Unlock Content</h3>
          <p class="text-primary">
            Reach new levels to access more advanced challenges and exclusive content.
          </p>
        </div>
      </div>
    </section>

    <!-- Practice Areas Section -->
    <section class="mb-16">
      <h2 class="text-3xl font-bold text-gold mb-8 text-center">Practice Areas</h2>

      <!-- HTML Practice -->
      <div class="mb-12 bg-tertiary p-8 rounded-lg">
        <h3 class="text-2xl font-bold text-orange mb-4">HTML Practice</h3>
        <p class="text-primary mb-6">
          Enhance your HTML skills through hands-on practice with real-world scenarios.
        </p>

        <div class="grid md:grid-cols-3 gap-6">
          <div class="bg-secondary p-6 rounded-lg">
            <h4 class="text-xl font-semibold text-gold mb-3">Beginner</h4>
            <ul class="text-primary space-y-2">
              <li>• Semantic markup challenges</li>
              <li>• Form validation exercises</li>
              <li>• Accessibility improvements</li>
              <li>• Basic structure problems</li>
            </ul>
          </div>
          <div class="bg-secondary p-6 rounded-lg">
            <h4 class="text-xl font-semibold text-gold mb-3">Intermediate</h4>
            <ul class="text-primary space-y-2">
              <li>• Complex form layouts</li>
              <li>• Table structure challenges</li>
              <li>• Multimedia integration</li>
              <li>• HTML5 API usage</li>
            </ul>
          </div>
          <div class="bg-secondary p-6 rounded-lg">
            <h4 class="text-xl font-semibold text-gold mb-3">Expert</h4>
            <ul class="text-primary space-y-2">
              <li>• Advanced accessibility</li>
              <li>• SVG and Canvas projects</li>
              <li>• Custom data attributes</li>
              <li>• Browser storage challenges</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- CSS Practice -->
      <div class="mb-12 bg-tertiary p-8 rounded-lg">
        <h3 class="text-2xl font-bold text-orange mb-4">CSS Practice</h3>
        <p class="text-primary mb-6">
          Master CSS styling and layout techniques through practical exercises.
        </p>

        <div class="grid md:grid-cols-3 gap-6">
          <div class="bg-secondary p-6 rounded-lg">
            <h4 class="text-xl font-semibold text-gold mb-3">Beginner</h4>
            <ul class="text-primary space-y-2">
              <li>• Basic styling challenges</li>
              <li>• Box model exercises</li>
              <li>• Color and typography</li>
              <li>• Simple layouts</li>
            </ul>
          </div>
          <div class="bg-secondary p-6 rounded-lg">
            <h4 class="text-xl font-semibold text-gold mb-3">Intermediate</h4>
            <ul class="text-primary space-y-2">
              <li>• Flexbox layouts</li>
              <li>• Grid system challenges</li>
              <li>• Responsive design</li>
              <li>• Animations and transitions</li>
            </ul>
          </div>
          <div class="bg-secondary p-6 rounded-lg">
            <h4 class="text-xl font-semibold text-gold mb-3">Expert</h4>
            <ul class="text-primary space-y-2">
              <li>• Advanced animations</li>
              <li>• CSS architecture</li>
              <li>• Performance optimization</li>
              <li>• Preprocessor challenges</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Python Practice -->
      <div class="mb-12 bg-tertiary p-8 rounded-lg">
        <h3 class="text-2xl font-bold text-orange mb-4">Python Practice</h3>
        <p class="text-primary mb-6">
          Enhance your Python skills through hands-on practice with real-world scenarios.
        </p>

        <div class="grid md:grid-cols-3 gap-6">
          <div class="bg-secondary p-6 rounded-lg">
            <h4 class="text-xl font-semibold text-gold mb-3">Beginner</h4>
            <ul class="text-primary space-y-2">
              <li>• Basic syntax exercises</li>
              <li>• Control flow challenges</li>
              <li>• Function writing</li>
              <li>• Data type manipulation</li>
            </ul>
          </div>
          <div class="bg-secondary p-6 rounded-lg">
            <h4 class="text-xl font-semibold text-gold mb-3">Intermediate</h4>
            <ul class="text-primary space-y-2">
              <li>• OOP implementation</li>
              <li>• File handling</li>
              <li>• API integration</li>
              <li>• Data structures</li>
            </ul>
          </div>
          <div class="bg-secondary p-6 rounded-lg">
            <h4 class="text-xl font-semibold text-gold mb-3">Expert</h4>
            <ul class="text-primary space-y-2">
              <li>• Design patterns</li>
              <li>• Web frameworks</li>
              <li>• Data science projects</li>
              <li>• Performance optimization</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Practice Tips Section -->
    <section class="mb-16 bg-tertiary p-8 rounded-lg">
      <h2 class="text-3xl font-bold text-gold mb-6">Practice Tips and Strategies</h2>
      <div class="grid md:grid-cols-3 gap-8">
        <div class="bg-secondary p-6 rounded-lg">
          <h3 class="text-xl font-semibold text-orange mb-3">Start Small</h3>
          <p class="text-primary">
            Begin with basic exercises and gradually increase difficulty as you improve.
          </p>
        </div>
        <div class="bg-secondary p-6 rounded-lg">
          <h3 class="text-xl font-semibold text-orange mb-3">Be Consistent</h3>
          <p class="text-primary">Practice regularly to build and maintain your coding skills.</p>
        </div>
        <div class="bg-secondary p-6 rounded-lg">
          <h3 class="text-xl font-semibold text-orange mb-3">Learn from Mistakes</h3>
          <p class="text-primary">
            Review feedback carefully to understand and learn from your errors.
          </p>
        </div>
      </div>
    </section>

    <!-- Sign Up CTA Section -->
    <section class="text-center mb-12">
      <div class="bg-tertiary p-8 rounded-lg max-w-3xl mx-auto">
        <h2 class="text-3xl font-bold text-gold mb-4">Ready to Start Practicing?</h2>
        <p class="text-primary mb-6">
          Sign up now to access all our practice exercises, track your progress, and improve your
          coding skills.
        </p>
        <router-link
          to="/signup"
          class="inline-block bg-orange text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue transition-colors"
        >
          Sign Up Now
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
defineOptions({
  name: 'PracticeView',
})
</script>
