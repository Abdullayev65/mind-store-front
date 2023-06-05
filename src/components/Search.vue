<template>

  <h2>Searching............ {{ username }}</h2>

</template>

<script>

export default {
  data() {
    return {
      users: [],
      username: '',
      page: 1,
    }
  },
  methods: {
    updateUrlFields() {
      if (this.$route.query.username && this.$route.query.username !== this.username) {
        this.username = this.$route.query.username
      }
      if (this.$route.query.page && this.$route.query.page !== this.page) {
        this.page = this.$route.query.page
      }
    }
  },
  mounted() {
    this.updateUrlFields()
  },
  watch: {
    $route(to, from) {
      this.updateUrlFields()
    },
    username() {
      this.$store.dispatch('searchUsers', {username: this.username})
          .then((data) => {
            console.log(data)
            this.$router.push({name: "login"})
          })
    }
  },

}
</script>


<style scoped>

</style>