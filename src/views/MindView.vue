<template>
  <h1 class="text-center"> Mind [{{ this.$store.state.counter }}] </h1>
  <h3 v-if="err" class="text-center text-bg-dark"> {{ err }} </h3>

  <div v-if="mindLoaded">
    <MindBox isOpen="true" :mind="mind">
      <MindBoxList :parentMindId="mind_id"/>
    </MindBox>
  </div>

</template>

<script>

import {defineComponent} from "vue";
import MindBox from "@/components/MindBox.vue";
import MindBoxList from "@/components/MindBoxList.vue";
import store from "@/store";

export default defineComponent({
  computed: {
    store() {
      return store
    }
  },
  components: {MindBox, MindBoxList},
  data() {
    return {
      mind: null,
      mind_id: '',
      mindLoaded: false,
      err: ''
    }
  },
  mounted() {
    this.mind_id = this.$route.params.mind_id
    this.$store.dispatch('getMindById', this.mind_id)
        .then((mind) => {
          this.mind = mind
          this.mindLoaded = true
        })
        .catch((err) => {
          this.err = err
        })
  }
})
</script>

<style scoped>

</style>

