<template>
  <footer class="bg-dark border-t border-gold">
    <div class="container mx-auto px-4 py-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 class="text-lg font-semibold text-primary hover:text-orange mb-4">CodeStation</h3>
          <p class="text-primary">Making coding fun and accessible for kids.</p>
        </div>
        <div>
          <h4 class="text-sm font-semibold text-orange mb-4">LEARN</h4>
          <ul class="space-y-2">
            <li><a href="#" class="text-primary hover:text-orange">HTML</a></li>
            <li><a href="#" class="text-primary hover:text-orange">CSS</a></li>
            <li><a href="#" class="text-primary hover:text-orange">Python</a></li>
          </ul>
        </div>
        <div>
          <h4 class="text-sm font-semibold text-orange mb-4">RESOURCES</h4>
          <ul class="space-y-2">
            <li><a href="#" class="text-primary hover:text-orange">Blog</a></li>
            <li><a href="#" class="text-primary hover:text-orange">Help Center</a></li>
            <li><a href="#" class="text-primary hover:text-orange">Community</a></li>
          </ul>
        </div>
        <div>
          <h4 class="text-sm font-semibold text-orange mb-4">COMPANY</h4>
          <ul class="space-y-2">
            <li><a href="#" class="text-primary hover:text-orange">About Us</a></li>
            <li><a href="#" class="text-primary hover:text-orange">Contact</a></li>
            <li><a href="#" class="text-primary hover:text-orange">Privacy Policy</a></li>
          </ul>
        </div>
      </div>
      <div class="mt-8 pt-8 border-t text-center text-primary text-2xl">
        <p>&copy; 2025 <span class="text-orange">Code-Station.</span> All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
defineOptions({
  name: 'AppFooter',
})
</script>
