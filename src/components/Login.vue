<template>

  <main class="form-signin w-25 m-auto">
    <form>
      <img class="mb-4" :src="logo" alt="" width="100">
      <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

      <ValidationErr v-if="validationErrs" :validationErrs="validationErrs" />

      <Input :label="'Email or Username'" :type="'text'" v-model="identifier" />
      <Input :label="'Password'" :type="'password'" v-model="password" />

      <Button type="submit" @click="onSubmit">Login</Button>
    </form>
  </main>

</template>

<script>
import {logo} from '@/constants'
import Button from "@/ui-components/Button.vue";
import Input from "@/ui-components/Input.vue";
import ValidationErr from "@/components/ValidationErr.vue";
import {mapState} from "vuex";

export default {
  components: {Input, Button, ValidationErr},
  data() {
    return {
      logo,
      identifier: '',
      password: '',
    }
  },
  computed: {
    ...mapState({
      isLoading: state => state.auth.isLoading
    }),
    // isLoading() {
    //   return this.$store.state.auth.isLoading
    // },
    validationErrs() {
      if (!this.$store.state.auth.err) {
        return false
      }

      return {msg: this.$store.state.auth.err}
    },
  },
  methods: {
    onSubmit(e) {
      e.preventDefault()
      const data = {
        identifier: this.identifier,
        password: this.password,
      }

      this.$store.dispatch("login", data).then(user => {
        this.$router.push({name: 'home'})
      }).catch(err => {
        console.log(err)
      })
    },
  },
}
</script>


<style scoped>

</style>