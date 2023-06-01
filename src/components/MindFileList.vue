<template>

  <div v-if="canAddNewFile||(mind.files&& mind.files.length)" class="drive-wrapper drive-grid-view">
    <div class="grid-items-wrapper">

      <MindFile
          v-if="mind.files"
          v-for="file in mind.files"
          :file="file"
          :mind="mind"
          :got_hashword="got_hashword"/>

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
import MindFile from "@/components/MindFile.vue";

export default {
  components: {MindFile},
  data() {
    return {
      canAddNewFile: false,
    }
    console.log(files)
  },
  props: {
    mind: {
      type: Object,
      required: true
    },
    got_hashword: {
      type: Object,
      required: true
    },
  },
  methods: {
    onUploadFile(e) {

      let files = e.target.files

      for (let i = 0; i < files.length; i++) {
        if (this.mind.hashed_id) {
          let hashedfiles = []

          var reader = new FileReader();
          reader.onload = () => {
            var key = this.mind._hashword;
            var wordArray = CryptoJS.lib.WordArray.create(reader.result);           // Convert: ArrayBuffer -> WordArray
            var encrypted = CryptoJS.AES.encrypt(wordArray, key).toString();        // Encryption: I: WordArray -> O: -> Base64 encoded string (OpenSSL-format)

            var fileEnc = new Blob([encrypted]);                                    // Create blob from string

            var file = new File([fileEnc], files[i].name, {type: files[i].type});
            hashedfiles = [file]
            this.addFilesToServer({
              files: hashedfiles,
              mind_id: this.mind.id,
              access: this.mind.access,
              hashed_id: this.mind.hashed_id
            })
          };
          reader.readAsArrayBuffer(files[i]);
        } else {
          this.addFilesToServer({files: e.target.files, mind_id: this.mind.id})
        }
      }


    },
    addFilesToServer(data) {
      return this.$store.dispatch('addFiles', data)
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
  },
  watch: {
    got_hashword() {
      this.canAddNewFile = true
    }
  },
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