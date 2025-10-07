<script >
import AppNav from './components/AppNav.vue';
import AppFooter from './components/AppFooter.vue';

export default {
  name: 'App',
  components: { AppFooter, AppNav}
}
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <AppNav />
    <main class="container mx-auto flex-1">
      <RouterView />
    </main>
    <AppFooter />
  </div>
</template>

<style scoped>
  
</style>
