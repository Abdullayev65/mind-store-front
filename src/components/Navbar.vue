<template>
  <div class="d-flex flex-column flex-md-row align-items-center py-3 mb-4 border-bottom">
    <a class="d-flex align-items-center text-dark text-decoration-none" @click="toHomeHandler">
      <img :src="logo" alt="logo" class="logo" style="cursor: pointer"/>
    </a>

    <nav class="d-inline-flex mt-2 mt-md-0 ms-md-auto">
      <RouterLink
          :to="{name: 'register'}"
          class="me-3 py-2 text-dark text-decoration-none"> Register
      </RouterLink>
      <RouterLink
          :to="{name: 'login'}"
          class="me-3 py-2 text-dark text-decoration-none"> Login
      </RouterLink>
      <RouterLink
          :to="{name: 'home'}"
          class="me-3 py-2 text-dark text-decoration-none"> Logout
      </RouterLink>

    </nav>
  </div>
</template>

<script>
// import {mapGetters} from 'vuex'
import {logo} from '@/constants'

export default {
  data() {
    return {
      logo,
    }
  },
  methods: {
    toHomeHandler() {
      return this.$router.push({name: "home"})
    }
  },
}
</script>

<style scoped>
.logo {
  width: 5rem;
}
</style>