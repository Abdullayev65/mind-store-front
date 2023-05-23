<template>
  <div class="d-flex flex-column flex-md-row align-items-center py-3 mb-4 border-bottom">
    <a class="d-flex align-items-center text-dark text-decoration-none" @click="toHomeHandler">
      <img :src="logo" alt="logo" class="logo" style="cursor: pointer"/>
    </a>

    <template v-if="isLoggedIn">
      <span>
      {{user.username}}
      </span>

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
        <RouterLink
            :to="{name: 'home'}"
            class="me-3 py-2 text-dark text-decoration-none"> Logout
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
    }
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