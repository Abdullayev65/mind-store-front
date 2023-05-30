<template>

  <div class="drive-wrapper drive-grid-view">
    <div class="grid-items-wrapper">

      <MindFile v-if="mind.files" v-for="file in mind.files" :file="file"/>

      <div :style="canAddNewFile?'':'display: none'">
        <label for="add-file" class="add-file">
          <i class="fa-solid fa-file-circle-plus fa-2xl"></i>
        </label>
        <input type="file" id="add-file" style="display: none" @change="onUploadFile">
      </div>

    </div>
  </div>


</template>

<script>
import {mapState} from "vuex";
import MindFile from "@/components/MindFile.vue";
import {createElementBlock} from "vue";

export default {
  components: {MindFile},
  data() {
    return {
      canAddNewFile: false,
    }
  },
  props: {
    mind: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState({
      mindsMap: state => state.mind.mindsMap
    }),
  },
  methods: {
    onUploadFile(e) {
      console.log('e.target_________________')
      console.log(e.target.files[0])

      this.$store.dispatch('addFiles', {files: e.target.files, mind_id: this.mind.id})
          .then((newFile) => {

            this.mind.files.push(newFile)
          })
          .catch((err) => {
            alert(err)
          })
    },
    checkCanAddNewFile() {
      if (!this.mind.hashed_id || this.mind._hashword)
        this.canAddNewFile = true
    },
    initComponent() {
      if (this.mind.hashed_id) {
        this.$store.dispatch('mustBeMindInId', this.mind.hashed_id)
            .then(() => {
              const hashed_mind = this.mindsMap.get(this.mind.hashed_id)
              if (!hashed_mind._hashword)
                hashed_mind._got_hashword_funcs.push(this.gotHashword)
            })
      }
    },
    gotHashword() {
      this.canAddNewFile = true
    }
  },
  mounted() {
    if (!this.mind.files)
      this.mind.files = []

    this.checkCanAddNewFile()
    this.initComponent()
  }
}
</script>


<style scoped>

.drive-wrapper {
  padding: 2em;
  background: #a2a6af;
  overflow: hidden;
  border-radius: .45em;
  margin: 0.3rem;
}

.add-file {
  display: inline-block;
  float: left;
  background-color: #6dbd63;
  border-radius: 1em;
  padding: 6vh 2.4vw;
}

</style>