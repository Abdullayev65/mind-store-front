<template>
  <div class="d-flex flex-column flex-md-row align-items-center py-3 mb-4 border-bottom">
    <a class="d-flex align-items-center text-dark text-decoration-none" @click="toHomeHandler">
      <img :src="logo" alt="logo" class="logo cursor-pointer"/>
    </a>

    <template v-if="isLoggedIn">
      <div class="d-inline-flex mt-2 mt-md-0 ms-md-auto text-secondary ">

        <div class="me-3 py-2">
          {{ user.username }}
        </div>
        <div class="me-3 py-2 cursor-pointer" @click="logout">
          Logout
        </div>

      </div>

    </template>
    <template v-else>
      <nav class="d-inline-flex mt-2 mt-md-0 ms-md-auto">
        <RouterLink
            :to="{name: 'register'}"
            class="me-3 py-2 text-dark text-decoration-none"> Register
        </RouterLink>
        <RouterLink
            :to="{name: 'login'}"
            class="me-3 py-2 text-dark text-decoration-none"> Login
        </RouterLink>
      </nav>
    </template>
  </div>
</template>

<script>
// import {mapGetters} from 'vuex'
import {logo} from '@/constants'
import {mapState} from "vuex";

export default {
  data() {
    return {
      logo,
    }
  },
  methods: {
    toHomeHandler() {
      return this.$router.push({name: "home"})
    },
    logout() {
      this.$store.dispatch('logout')
      return this.$router.push({name: "login"})
    },
  },
  computed: {
    ...mapState({
      user: state => state.auth.user,
      isLoggedIn: state => state.auth.isLoggedIn,
    })
  }
}
</script>

<style scoped>
.logo {
  width: 5rem;
}
</style>