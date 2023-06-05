<template>
  <div class="d-flex flex-column flex-md-row align-items-center py-3 mb-4 border-bottom">
    <a class="d-flex align-items-center text-decoration-none" @click="toHomeHandler">
      <img :src="logo" alt="logo" class="logo cursor-pointer"/>
    </a>

    <div class="input-group search-input">
      <div class="form-outline">
        <input type="search"
               v-on:keyup.enter="clickOnSearchButton"
               v-model="searchUsername"
               id="form1"
               placeholder="Search username..."
               class="form-control"/>
        <label class="form-label" for="form1"></label>
      </div>
      <button type="button"
              @click="clickOnSearchButton"
              class="btn btn-primary"
              style="height: 2.4rem">
        <i class="fas fa-search"></i>
      </button>
    </div>

    <template v-if="isLoggedIn">
      <div class="d-inline-flex mt-2 mt-md-0 ms-md-auto">

        <div class="me-3 py-2 my-text">
          @{{ user.username }}
        </div>
        <div class="me-3 py-2 cursor-pointer my-btn" @click="logout">
          Logout
        </div>

      </div>

    </template>
    <template v-else>
      <nav class="d-inline-flex mt-2 mt-md-0 ms-md-auto">
        <RouterLink
            :to="{name: 'register'}"
            class="me-3 py-2 text-decoration-none my-btn"> Register
        </RouterLink>
        <RouterLink
            :to="{name: 'login'}"
            class="me-3 py-2 text-decoration-none my-btn"> Login
        </RouterLink>
      </nav>
    </template>


  </div>


</template>

<script>
// import {mapGetters} from 'vuex'
import {logo} from '@/constants'
import {mapGetters} from "vuex";
import dataHasher from "@/helpers/dataHasher";

export default {
  data() {
    return {
      logo,
      searchUsername: '',
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
    clickOnSearchButton(e) {
      // alert(this.searchUsername)

      this.$router.push({
        name: "search",
        query: {
          username: this.searchUsername
        }
      })
    },
  },
  computed: {
    ...mapGetters({
      user: 'auth__user',
      isLoggedIn: 'auth__isLoggedIn',
      isAnonymous: 'auth__isAnonymous',
    }),
    // ...mapState({
    //   user: state => state.auth.user,
    //   isLoggedIn: state => state.auth.isLoggedIn,
    // }),
  }
}
</script>

<style scoped>
.logo {
  width: 5rem;
}

.search-input {
  margin-left: 6rem;
}

</style>