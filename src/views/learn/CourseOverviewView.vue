<template>
  <CourseOverview :course="course" />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import CourseOverview from '../../components/learn/CourseOverview.vue'

defineOptions({
  name: 'CourseOverviewView',
})

const route = useRoute()
const course = ref(null)

// Mock course data - Replace with API call
const mockCourses = {
  'html-fundamentals': {
    title: 'HTML Fundamentals',
    description: 'Learn the building blocks of web development with HTML5.',
    difficulty: 'Beginner',
    estimatedTime: 10,
    lessonsCount: 12,
    exercisesCount: 24,
    projectsCount: 3,
    rating: 4.8,
    skills: [
      'Create well-structured HTML documents',
      'Use semantic HTML elements',
      'Build forms with proper validation',
      'Implement responsive images and media',
      'Create accessible web content',
      'Understand HTML5 APIs',
    ],
    modules: [
      {
        title: 'Introduction to HTML',
        duration: 2,
        description: 'Learn the basics of HTML and create your first web page.',
        lessons: [
          { title: 'What is HTML?', duration: 15 },
          { title: 'Basic Document Structure', duration: 20 },
          { title: 'Your First HTML Page', duration: 25 },
        ],
      },
      {
        title: 'HTML Elements and Attributes',
        duration: 3,
        description: 'Master the most commonly used HTML elements and their attributes.',
        lessons: [
          { title: 'Text Elements', duration: 20 },
          { title: 'Lists and Links', duration: 25 },
          { title: 'Images and Media', duration: 30 },
        ],
      },
      {
        title: 'Forms and Input',
        duration: 3,
        description: 'Learn to create interactive forms and handle user input.',
        lessons: [
          { title: 'Form Basics', duration: 25 },
          { title: 'Input Types', duration: 30 },
          { title: 'Form Validation', duration: 35 },
        ],
      },
      {
        title: 'Advanced HTML',
        duration: 2,
        description: 'Explore advanced HTML features and best practices.',
        lessons: [
          { title: 'Semantic HTML', duration: 30 },
          { title: 'Accessibility', duration: 25 },
          { title: 'HTML5 APIs', duration: 35 },
        ],
      },
    ],
    prerequisites: [
      'Basic computer skills',
      'A text editor (we recommend VS Code)',
      'A modern web browser',
    ],
  },
  'css-mastery': {
    title: 'CSS Mastery',
    description: 'Master styling and layout with modern CSS techniques.',
    difficulty: 'Intermediate',
    estimatedTime: 15,
    lessonsCount: 18,
    exercisesCount: 36,
    projectsCount: 4,
    rating: 4.7,
    skills: [
      'Create responsive layouts with Flexbox and Grid',
      'Implement modern CSS animations',
      'Use CSS variables and custom properties',
      'Build responsive designs with media queries',
      'Optimize CSS performance',
      'Apply CSS best practices',
    ],
    modules: [
      {
        title: 'CSS Fundamentals',
        duration: 3,
        description: 'Review CSS basics and learn modern CSS features.',
        lessons: [
          { title: 'CSS Selectors', duration: 20 },
          { title: 'Box Model', duration: 25 },
          { title: 'CSS Variables', duration: 30 },
        ],
      },
      {
        title: 'Layout Techniques',
        duration: 4,
        description: 'Master modern CSS layout techniques.',
        lessons: [
          { title: 'Flexbox Basics', duration: 30 },
          { title: 'Advanced Flexbox', duration: 35 },
          { title: 'CSS Grid Basics', duration: 30 },
          { title: 'Advanced Grid', duration: 35 },
        ],
      },
      {
        title: 'Responsive Design',
        duration: 3,
        description: 'Learn to create responsive and mobile-first designs.',
        lessons: [
          { title: 'Media Queries', duration: 25 },
          { title: 'Responsive Images', duration: 30 },
          { title: 'Mobile-First Design', duration: 35 },
        ],
      },
      {
        title: 'Advanced CSS',
        duration: 5,
        description: 'Explore advanced CSS features and techniques.',
        lessons: [
          { title: 'CSS Animations', duration: 30 },
          { title: 'CSS Transitions', duration: 25 },
          { title: 'CSS Transforms', duration: 30 },
          { title: 'CSS Architecture', duration: 35 },
          { title: 'Performance Optimization', duration: 30 },
        ],
      },
    ],
    prerequisites: [
      'HTML Fundamentals',
      'Basic CSS knowledge',
      'Understanding of web development concepts',
    ],
  },
  'python-programming': {
    title: 'Python Programming',
    description: 'Start your programming journey with Python.',
    difficulty: 'Beginner',
    estimatedTime: 20,
    lessonsCount: 24,
    exercisesCount: 48,
    projectsCount: 5,
    rating: 4.9,
    skills: [
      'Write clean and efficient Python code',
      'Work with data structures and algorithms',
      'Build command-line applications',
      'Handle file operations and exceptions',
      'Use Python libraries and packages',
      'Create basic web applications',
    ],
    modules: [
      {
        title: 'Python Basics',
        duration: 4,
        description: 'Learn Python fundamentals and basic syntax.',
        lessons: [
          { title: 'Introduction to Python', duration: 20 },
          { title: 'Variables and Data Types', duration: 25 },
          { title: 'Control Flow', duration: 30 },
          { title: 'Functions', duration: 35 },
        ],
      },
      {
        title: 'Data Structures',
        duration: 5,
        description: 'Master Python data structures and algorithms.',
        lessons: [
          { title: 'Lists and Tuples', duration: 30 },
          { title: 'Dictionaries and Sets', duration: 35 },
          { title: 'String Operations', duration: 25 },
          { title: 'List Comprehensions', duration: 30 },
          { title: 'Basic Algorithms', duration: 35 },
        ],
      },
      {
        title: 'Object-Oriented Programming',
        duration: 4,
        description: 'Learn OOP concepts in Python.',
        lessons: [
          { title: 'Classes and Objects', duration: 35 },
          { title: 'Inheritance', duration: 30 },
          { title: 'Encapsulation', duration: 25 },
          { title: 'Polymorphism', duration: 30 },
        ],
      },
      {
        title: 'Advanced Topics',
        duration: 7,
        description: 'Explore advanced Python features and applications.',
        lessons: [
          { title: 'File Handling', duration: 30 },
          { title: 'Exception Handling', duration: 25 },
          { title: 'Working with APIs', duration: 35 },
          { title: 'Database Operations', duration: 40 },
          { title: 'Web Development Basics', duration: 45 },
          { title: 'Testing and Debugging', duration: 35 },
          { title: 'Project: Build a Web App', duration: 60 },
        ],
      },
    ],
    prerequisites: [
      'Basic computer skills',
      'Python 3.x installed',
      'A code editor (we recommend VS Code)',
    ],
  },
}

onMounted(() => {
  const courseSlug = route.params.slug
  course.value = mockCourses[courseSlug]
})
</script>
