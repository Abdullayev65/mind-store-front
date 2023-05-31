<template>

  <main class="form-signin w-25 m-auto">
    <form>
      <img class="mb-4" :src="logo" alt="" width="100">
      <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

      <ValidationErr v-if="validationErrs" :validationErrs="validationErrs"/>
      <Input :label="'Name'" :type="'text'" v-model="name"/>
      <Input :label="'Email address'" :type="'email'" v-model="email"/>
      <Input :label="'Password'" :type="'password'" v-model="password"/>

      <Button type="submit"
              @click="submitHandler"
              :disabled="isLoading">
        Sign in
      </Button>
    </form>
  </main>

</template>

<script>
import {logo} from '@/constants'
import Input from "@/ui-components/Input.vue";
import localStore from "@/helpers/persistaneStorage.js";
import ValidationErr from "@/components/ValidationErr.vue";

export default {
  components: {ValidationErr, Input},
  data() {
    return {
      logo,
      name: '',
      email: '',
      password: '',
    }
  },
  methods: {
    submitHandler(e) {
      e.preventDefault()
      const data = {
        username: this.name,
        email: this.email,
        password: this.password,
        first_name: this.name,
      }

      this.$store.dispatch("register", data).then(user => {
        localStore.setItem('token', user.token)
        this.$router.push({name: 'home'})
      }).catch(err => {
        console.log(err)
      })
    }
  },
  computed: {
    isLoading() {
      return this.$store.state.auth.isLoading
    },
    validationErrs() {
      if (!this.$store.state.auth.err) {
        return false
      }
      const arr = {msg: this.$store.state.auth.err}
      return arr
    },

  },
}
</script>


<style scoped>

</style>