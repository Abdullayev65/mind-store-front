<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="container">

    <Navbar />
    <RouterView />
  </div>

</template>

<script>
import Navbar from "@/components/Navbar.vue"
import {RouterView} from "vue-router";

export default {
  components: {
    Navbar,
  },
  mounted() {
    this.$store.dispatch('getUser')
  }
}
</script>

<style scoped>

</style>
