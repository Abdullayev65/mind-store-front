<template>
  <ul class="list-group" >
    <li v-for="errMsg in errMsgs" :key="errMsg" class="list-group-item list-group-item-danger">
      {{errMsg}}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'ValidationErr',
  props: {
    validationErrs: {
      type: Object,
      required: true
    }
  },
  computed: {
    errMsgs() {
      return Object.keys(this.validationErrs).map(name => {
        console.log(name)
        console.log(this.validationErrs[name])
        return this.validationErrs[name]
      })
    }
  }
}
</script>


<style scoped>

</style>