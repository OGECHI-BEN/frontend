<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Welcome Section -->
    <section class="mb-12 text-center">
      <h1 class="text-4xl font-bold text-gold mb-4">Learn to Code</h1>
      <p class="text-xl text-primary max-w-3xl mx-auto">
        Master web development and programming with our structured learning paths. Start your
        journey from beginner to expert.
      </p>
    </section>

    <!-- Why Learn to Code Section -->
    <section class="mb-16 bg-tertiary p-8 rounded-lg">
      <h2 class="text-3xl font-bold text-gold mb-6">Why Learn to Code?</h2>
      <div class="grid md:grid-cols-3 gap-8">
        <div class="bg-secondary p-6 rounded-lg">
          <h3 class="text-xl font-semibold text-orange mb-3">High Demand</h3>
          <p class="text-primary">
            Coding skills are in high demand across industries, offering excellent career
            opportunities.
          </p>
        </div>
        <div class="bg-secondary p-6 rounded-lg">
          <h3 class="text-xl font-semibold text-orange mb-3">Problem Solving</h3>
          <p class="text-primary">
            Develop critical thinking and problem-solving skills that apply to any field.
          </p>
        </div>
        <div class="bg-secondary p-6 rounded-lg">
          <h3 class="text-xl font-semibold text-orange mb-3">Creativity</h3>
          <p class="text-primary">
            Express your creativity by building websites, applications, and digital solutions.
          </p>
        </div>
      </div>
    </section>

    <!-- Learning Paths Section -->
    <section class="mb-16">
      <h2 class="text-3xl font-bold text-gold mb-8 text-center">Our Learning Paths</h2>

      <!-- HTML Track -->
      <div class="mb-12 bg-tertiary p-8 rounded-lg">
        <h3 class="text-2xl font-bold text-orange mb-4">HTML Track</h3>
        <p class="text-primary mb-6">
          Learn to structure web content with HTML, the foundation of web development.
        </p>

        <div class="grid md:grid-cols-3 gap-6">
          <div class="bg-secondary p-6 rounded-lg">
            <h4 class="text-xl font-semibold text-gold mb-3">Beginner</h4>
            <ul class="text-primary space-y-2">
              <li>• Basic HTML document structure</li>
              <li>• Essential tags and elements</li>
              <li>• Lists, links, and images</li>
              <li>• Creating your first web page</li>
            </ul>
          </div>
          <div class="bg-secondary p-6 rounded-lg">
            <h4 class="text-xl font-semibold text-gold mb-3">Intermediate</h4>
            <ul class="text-primary space-y-2">
              <li>• Forms and input validation</li>
              <li>• Semantic HTML elements</li>
              <li>• Tables and data representation</li>
              <li>• HTML5 audio and video</li>
            </ul>
          </div>
          <div class="bg-secondary p-6 rounded-lg">
            <h4 class="text-xl font-semibold text-gold mb-3">Expert</h4>
            <ul class="text-primary space-y-2">
              <li>• Accessibility best practices</li>
              <li>• SVG and Canvas integration</li>
              <li>• Custom data attributes</li>
              <li>• HTML5 APIs and browser storage</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- CSS Track -->
      <div class="mb-12 bg-tertiary p-8 rounded-lg">
        <h3 class="text-2xl font-bold text-orange mb-4">CSS Track</h3>
        <p class="text-primary mb-6">
          Master styling and layout with CSS to create beautiful, responsive websites.
        </p>

        <div class="grid md:grid-cols-3 gap-6">
          <div class="bg-secondary p-6 rounded-lg">
            <h4 class="text-xl font-semibold text-gold mb-3">Beginner</h4>
            <ul class="text-primary space-y-2">
              <li>• Basic selectors and properties</li>
              <li>• Colors, fonts, and text styling</li>
              <li>• Box model and layout basics</li>
              <li>• Simple responsive design</li>
            </ul>
          </div>
          <div class="bg-secondary p-6 rounded-lg">
            <h4 class="text-xl font-semibold text-gold mb-3">Intermediate</h4>
            <ul class="text-primary space-y-2">
              <li>• Flexbox and Grid layouts</li>
              <li>• Advanced selectors and specificity</li>
              <li>• Transitions and animations</li>
              <li>• Media queries and responsive design</li>
            </ul>
          </div>
          <div class="bg-secondary p-6 rounded-lg">
            <h4 class="text-xl font-semibold text-gold mb-3">Expert</h4>
            <ul class="text-primary space-y-2">
              <li>• CSS preprocessors (SASS/SCSS)</li>
              <li>• Advanced animations and effects</li>
              <li>• CSS architecture and methodologies</li>
              <li>• Performance optimization</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Python Track -->
      <div class="mb-12 bg-tertiary p-8 rounded-lg">
        <h3 class="text-2xl font-bold text-orange mb-4">Python Track</h3>
        <p class="text-primary mb-6">Learn Python programming from basics to advanced concepts.</p>

        <div class="grid md:grid-cols-3 gap-6">
          <div class="bg-secondary p-6 rounded-lg">
            <h4 class="text-xl font-semibold text-gold mb-3">Beginner</h4>
            <ul class="text-primary space-y-2">
              <li>• Python syntax and data types</li>
              <li>• Variables, operators, and expressions</li>
              <li>• Control flow (if/else, loops)</li>
              <li>• Functions and basic modules</li>
            </ul>
          </div>
          <div class="bg-secondary p-6 rounded-lg">
            <h4 class="text-xl font-semibold text-gold mb-3">Intermediate</h4>
            <ul class="text-primary space-y-2">
              <li>• Object-oriented programming</li>
              <li>• File handling and exceptions</li>
              <li>• Working with libraries and APIs</li>
              <li>• Data structures and algorithms</li>
            </ul>
          </div>
          <div class="bg-secondary p-6 rounded-lg">
            <h4 class="text-xl font-semibold text-gold mb-3">Expert</h4>
            <ul class="text-primary space-y-2">
              <li>• Advanced OOP and design patterns</li>
              <li>• Web development with frameworks</li>
              <li>• Data science and machine learning</li>
              <li>• Performance optimization and testing</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Learning Methodology Section -->
    <section class="mb-16 bg-tertiary p-8 rounded-lg">
      <h2 class="text-3xl font-bold text-gold mb-6">Our Learning Methodology</h2>
      <div class="grid md:grid-cols-4 gap-6">
        <div class="bg-secondary p-6 rounded-lg">
          <h3 class="text-xl font-semibold text-orange mb-3">Learn</h3>
          <p class="text-primary">Comprehensive lessons with clear explanations and examples.</p>
        </div>
        <div class="bg-secondary p-6 rounded-lg">
          <h3 class="text-xl font-semibold text-orange mb-3">Practice</h3>
          <p class="text-primary">Hands-on exercises to reinforce your understanding.</p>
        </div>
        <div class="bg-secondary p-6 rounded-lg">
          <h3 class="text-xl font-semibold text-orange mb-3">Build</h3>
          <p class="text-primary">Create real projects to apply what you've learned.</p>
        </div>
        <div class="bg-secondary p-6 rounded-lg">
          <h3 class="text-xl font-semibold text-orange mb-3">Review</h3>
          <p class="text-primary">Get feedback and improve your skills continuously.</p>
        </div>
      </div>
    </section>

    <!-- Sign Up CTA Section -->
    <section class="text-center mb-12">
      <div class="bg-tertiary p-8 rounded-lg max-w-3xl mx-auto">
        <h2 class="text-3xl font-bold text-gold mb-4">Ready to Start Your Coding Journey?</h2>
        <p class="text-primary mb-6">
          Sign up now to access all our courses, practice exercises, and personalized learning
          paths.
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
  name: 'LearnView',
})
</script>
