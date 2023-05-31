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
    return {}
  },
  computed: {
    ...mapGetters({
      user: 'auth__user',
      // isLoggedIn: 'auth__isLoggedIn',
      // isAnonymous: 'auth__isAnonymous',
    }),
  }
})
</script>

<style scoped>

</style>