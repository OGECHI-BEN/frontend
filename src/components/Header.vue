<template>
  <header
    class="bg-dark text-primary hover:text-orange w-full p-4 shadow-md sticky top-0 right-0 left-0"
  >
    <div class="container mx-auto flex justify-between items-center">
      <div class="flex items-center space-x-2">
        <RouterLink to="/" class="lex items-center space-x-2">
          <!-- <img alt="Vue logo" class="logo h-12 w-12" src="@/assets/images/cdlogo.jpg" /> -->
          <h1 class="text-xl font-semibold text-white hover:text-orange">
            CODE<span class="text-gold hover:text-orange">-STATION</span>
          </h1>
        </RouterLink>
      </div>

      <nav class="hidden md:flex space-x-8">
        <RouterLink to="/learn" class="text-white hover:text-orange" active-class="">
          Learn
        </RouterLink>
        <RouterLink to="/practice" class="text-white hover:text-orange" active-class="">
          Practice
        </RouterLink>
        <RouterLink to="/signup" class="text-white hover:text-orange" active-class="">
          Signup
        </RouterLink>
      </nav>
      <!-- Mobile section would come in here -->
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header', // You can name it whatever you prefer
}
</script>
