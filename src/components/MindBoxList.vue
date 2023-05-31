<template>

  <h2 v-if="!subMindsLoaded">Loading...</h2>
  <div v-else>
    <MindBox v-for="mind in currentMind['sub_minds']" :mind="mind"/>
  </div>

</template>

<script>
import {mapState} from "vuex";
import MindBox from "@/components/MindBox.vue";

export default {
  components: {MindBox},
  data() {
    return {
      subMindsLoaded: false,
      currentMind: null,
    }
  },
  props: {
    parentMindId: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState({
      mindsMap: state => state.mind.mindsMap
    }),
  },
  methods: {},
  mounted() {
    this.$store.dispatch('getById', this.parentMindId)
        .then((m) => {
          this.currentMind = this.mindsMap.get(this.parentMindId)
          this.subMindsLoaded = true
        })
        .catch((err) => {
          alert(err)
        })
  }
}
</script>


<style scoped>

</style>