<script >
import AppNav from './components/AppNav.vue';
import AppFooter from './components/AppFooter.vue';

export default {
  name: 'App',
  components: { AppFooter, AppNav}
}
</script>

<template>
  <AppNav />
  <main class=" container mx-auto">
    <RouterView />
  </main>
 <AppFooter />
</template>

<style scoped>

</style>
