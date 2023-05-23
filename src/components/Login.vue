<template>

  <main class="form-signin w-25 m-auto">
    <form>
      <img class="mb-4" :src="logo" alt="" width="100">
      <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

      <Input :label="'Email address'" :type="'email'" />
      <Input :label="'Password'" :type="'password'" />

      <Button type="submit">Login</Button>
    </form>
  </main>

</template>

<script>
import {logo} from '@/constants'
import Button from "@/ui-components/Button.vue";
import Input from "@/ui-components/Input.vue";

export default {
  components: {Input, Button},
  data() {
    return {
      logo,
    }
  },
}
</script>


<style scoped>

</style>