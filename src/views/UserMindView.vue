<template>
  <h1 class="text-center"> Minds </h1>
  <MindBoxList v-if="user" :parentMindId="user.mind_id"/>
</template>

<script>

import {defineComponent} from "vue";
import MindBoxList from "@/components/MindBoxList.vue";
import {mapGetters} from "vuex";

export default defineComponent({
  components: {MindBoxList},
  data() {
    return {
      user: null,
      username: '',
    }
  },
  mounted() {
    this.username = this.$route.params.username
    this.$store.dispatch('getUserByUsername', this.username)
        .then((user) => {
          this.user =user
        })
        .catch((err) => {
          alert(err)
        })
  },
})
</script>

<style scoped>

</style>

