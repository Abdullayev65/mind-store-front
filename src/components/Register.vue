<template>

  <main class="form-signin w-25 m-auto">
    <form>
      <img class="mb-4" :src="logo" alt="" width="100">
      <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

      <Input :label="'Name'" :type="'text'"  v-model="name" />
      <Input :label="'Email address'" :type="'email'"  v-model="email" />
      <Input :label="'Password'" :type="'password'"  v-model="password" />

      <Button type="submit"
              @click="submitHandler"
              :disabled="isLoading">
        Sign in</Button>
    </form>
  </main>

</template>

<script>
import {logo} from '@/constants'
import Input from "@/ui-components/Input.vue";

export default {
  components: {Input},
  data() {
    return {
      logo,
      name : '',
      email : '',
      password : '',
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
      console.log(this)
      this.$store.dispatch("register", data).then(user => {
        this.$router.push({name: 'home'})
      })
    }
  },
  computed: {
      isLoading() {
        return this.$store.state.auth.isLoading
      }
  },
}
</script>


<style scoped>

</style>