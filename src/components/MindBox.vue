<template>


  <div class="main-box" v-if="!mind._deleted">


    <div @click="clickOnTopic" class="mind-overview">

    <span class="delete-mind"
          @click="clickDeleteMind">
    x</span>

      <!-- share-btn -->
      <span
          style="background-color: dodgerblue"
          class="share-btn" @click="clickShareMind">
          <button
              style="background: none; border: none;">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-share"
                 viewBox="0 0 16 16">
              <path
                  d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"/>
            </svg>
          </button>
    </span>


      <!--      <div class="alert alert-success" role="alert">-->
      <!--        A simple success alert—check it out!-->
      <!--      </div>-->


      <textarea
          class="changeable-input topic"
          :rows="mind.topic.length<30?'1':''"
          :disabled="!open"
          v-model="mind.topic"
          @focusout="handleFocusOut_topic">
    </textarea>

    </div>

    <div v-show="open">
      <div class="mind-btns">
        <i class="gg-chevron-up-o mind-btn close-btn"
           @click="clickOnClose"></i>

        <i class="fa-solid fa-2xl mind-btn access-btn"
           :class="mind.access==99?'fa-users':'fa-user'"
           @click="clickOnAccess">
        </i>


        <i v-if="!mind.hashed_id"
           @click="model_open_enter_hashword=true"
           class="mind-btn hashing-btn">
          h#shing</i>

        <div v-if="model_open_enter_hashword"
             style="display: block"
             class="modal">
          <div class="modal-dialog modal-dialog-centered"
               role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">Enter Hashword for topic `{{ mind.topic }}`</h4>
              </div>
              <div class="modal-header">
                <h6 class="modal-title text-danger">Make sure you can remember this hashword.
                  Because if you forget it, we can not help to returning it, because we don't save it </h6>
              </div>
              <div class="modal-body">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                  </div>
                  <input type="text"
                         class="form-control"
                         placeholder="h#shword..."
                         style="border-radius: 0.7rem"
                         :disabled="loadForHashOnHashingModal"
                         v-on:keyup.enter="clickOnHashInModal"
                         autofocus
                         v-model="mind._hashword">
                </div>
              </div>
              <div class="modal-footer">
                <button type="button"
                        class="btn btn-secondary"
                        data-dismiss="modal"
                        @click="modelEnterHashwordCancel">Close
                </button>
                <button type="button"
                        class="btn btn-primary"
                        :disabled="!mind._hashword || loadForHashOnHashingModal"
                        @click="clickOnHashInModal">
                  Hash
                </button>
              </div>
            </div>
          </div>
        </div>


        <i v-else-if="mind.hashed_id && !mind._hashword"
           @click="model_set_hashword=true"
           class="mind-btn set-hashword-btn">
          set_h#shword</i>
        <div v-if="model_set_hashword"
             style="display: block"
             class="modal">
          <div class="modal-dialog modal-dialog-centered"
               role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">Enter Hashword for topic `{{ mind.topic }}`</h4>
              </div>
              <div class="modal-header">
                <h6 class="modal-title">hashword for mind in id`{{ mind.hashed_id }}`</h6>
              </div>
              <div class="modal-body">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                  </div>
                  <input type="text"
                         class="form-control"
                         placeholder="h#shword..."
                         style="border-radius: 0.7rem"
                         v-on:keyup.enter="clickOnSetHashWordInModal"
                         autofocus
                         v-model="mind._hashword">
                </div>
              </div>
              <div class="modal-footer">
                <button type="button"
                        class="btn btn-secondary"
                        data-dismiss="modal"
                        @click="modelSetHashwordCancel">Close
                </button>
                <button type="button"
                        class="btn btn-primary"
                        :disabled="!mind._hashword || loadForHashOnHashingModal"
                        @click="clickOnSetHashWordInModal">
                  Hash
                </button>
              </div>
            </div>
          </div>
        </div>


        <i v-if="mind.hashed_id && mind._hashword" class="mind-btn hashed-btn">h#shed</i>
      </div>

      <div class="content-box">
        <textarea
            class="caption changeable-input"
            v-model="mind.caption"
            :disabled="!canEditMindFields"
            :rows="(!mind.caption || mind.caption.length<30)?'1':''"
            @focusout="handleFocusOut_caption"></textarea>
      </div>

      <div class="files-container">
        <MindFileList :mind="this.mind" :got_hashword="got_hashword"/>
      </div>

      <div>
        <slot></slot>
      </div>

    </div>
  </div>

</template>

<script>
import {mapState} from "vuex";
import dataHasher from "@/helpers/dataHasher.js";
import MindFileList from "@/components/MindFileList.vue";
import {createToast} from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css'
import {domain} from "@/constants/domain.js";

export default {
  components: {MindFileList},
  computed: {
    ...mapState({
      mindsMap: state => state.mind.mindsMap
    }),
  },
  props: {
    mind: {
      type: Object,
      required: true,
    },
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      open: false,
      old_caption: this.mind.caption,
      old_topic: this.mind.topic,
      model_open_enter_hashword: false,
      model_set_hashword: false,
      loadForHashOnHashingModal: false,
      canEditMindFields: true,
      canEditMindTopic: true,
      got_hashword: false,
    }
  },
  methods: {
    loadSubMinds() {
      return this.$store.dispatch('getSubMindsById', this.mind.id)
          .then((subMinds) => {
            if (subMinds.length < 1
                && (!this.mind.files || this.mind.files.length < 1)
                && !this.mind.hashed_id) {
              this.mind._can_hash = true
            }
          })
          .catch((err) => {
            alert(err)
          })
    },
    loadSubMindsIfNotLoaded() {
      if (this.mind._sub_minds_loaded)
        return
      this.loadSubMinds()
          .then(() => {
            this.mind._sub_minds_loaded = true
          })
    },
    updateMind(updated_mind) {
      updated_mind.id = this.mind.id
      return this.$store.dispatch('updateById', updated_mind)
          .catch((err) => {
            alert(err)
          })
    },
    handleFocusOut_caption(focusEvent) {
      let caption = this.mind.caption

      if (this.old_caption === caption)
        return
      if (this.mind._hashword)
        caption = dataHasher.hash(this.mind._hashword, caption)

      this.updateMind({caption})
          .then(() => {
            this.old_caption = this.mind.caption;
          })
    },
    handleFocusOut_topic(focusEvent) {
      let topic = this.mind.topic

      if (this.old_topic === topic)
        return
      if (this.mind._hashword && this.mind.hashed_id !== this.mind.id)
        topic = dataHasher.hash(this.mind._hashword, topic)

      this.updateMind({topic})
          .then(() => {
            this.old_topic = this.mind.topic
          })
    },
    clickOnTopic(event) {
      this.open = true
      this.loadSubMindsIfNotLoaded()
    },
    clickDeleteMind(e) {
      this.$store.dispatch('deleteMind', this.mind.id)
          .then(() => {
            this.mind._deleted = true
          })
          .catch((err) => {
            alert(err)
          })
    },
    async clickShareMind(e) {
      // toast.success("<><><><ssa", 3000)

      try {
        const url = `${domain}/mind/${this.mind.id}`
        await navigator.clipboard.writeText(url);

        createToast(`url copied ${url}`)

      } catch ($e) {
        alert('Cannot copy');
      }

    },
    clickOnClose(e) {
      this.open = false
    },
    clickOnAccess(e) {
      let access = this.mind.access === 33 ? 99 : 33
      this.mind.access = access
      this.updateMind({access})
    },
    clickOnHashInModal(e) {
      this.loadForHashOnHashingModal = true
      this.mind.caption = this.mind.caption ? this.mind.caption : ' '
      const caption = dataHasher.hash(this.mind._hashword, this.mind.caption)

      this.updateMind({caption, hashed_id: this.mind.id})
          .then(() => {
            this.model_open_enter_hashword = false
            this.mind.hashed_id = this.mind.id
            this.mind._can_hash = false
          })
          .then(() => {
            this.mind.hashed_id = this.mind.id
          })
          .catch((err) => {
            alert(err)
          })
          .finally(() => {
            this.loadForHashOnHashingModal = false
          })
    },
    clickOnSetHashWordInModal(e) {

      let a
      if (this.mind.id === this.mind.hashed_id)
        a = dataHasher.unhash(this.mind._hashword, this.mind.caption)
      else
        a = dataHasher.unhash(this.mind._hashword, this.mind.topic)

      if (a.err) {
        alert("hashword gone wrong!")
        return
      }

      this.unhashingData()
      // ----
      this.mindsMap.set(this.mind.id, this.mind)
      this._gotHashword()
      this.model_set_hashword = false
      this.canEditMindFields = true
      this.canEditMindTopic = true
      this.got_hashword = true
    },
    checkingHashWord() {
      if (this.mind.hashed_id) {
        let hashedMind = this.mindsMap.get(this.mind.hashed_id)
        if (hashedMind && hashedMind._hashword) {
          this.mind._hashword = hashedMind._hashword
          this.unhashingData()
        } else {
          this.canEditMindFields = false
          this.canEditMindTopic = false
          if (this.mind.hashed_id === this.mind.id) {
            this.canEditMindTopic = true
          }
        }
      }
    },
    unhashingData() {
      if (!this.mind.hashed_id)
        return
      if (!this.mind._hashword) {
        let hashedMind = this.mindsMap.get(this.mind.hashed_id)
        if (hashedMind && hashedMind._hashword)
          this.mind._hashword = hashedMind._hashword
      }

      const hashword = this.mind._hashword
      if (hashword) {
        this.mind.caption = dataHasher.mustUnhash(hashword, this.mind.caption)
        if (this.mind.hashed_id !== this.mind.id)
          this.mind.topic = dataHasher.mustUnhash(hashword, this.mind.topic)

        this.savingFieldsAsOld()
      } else {
        this.canEditMindFields = false
        this.canEditMindTopic = false

      }

    },
    savingFieldsAsOld() {
      this.old_caption = this.mind.caption
      this.old_topic = this.mind.topic
    },
    modelEnterHashwordCancel() {
      this.model_open_enter_hashword = false
      setTimeout(() => {
        this.mind._hashword = ''
      }, 50)
    },
    modelSetHashwordCancel() {
      this.model_set_hashword = false
      this.mind._hashword = ''
    },
    _gotHashword() {
      this.$store.state.setHashword(this.mind.hashed_id, this.mind._hashword)
    },
    parentGotHashword() {
      this.unhashingData()
      this.model_set_hashword = false
      this.canEditMindFields = true
      this.canEditMindTopic = true
      this.got_hashword = true
    },
  },
  mounted() {

    if (!this.mind._deleted)
      this.mind._deleted = false
    if (this.isOpen)
      this.open = true

    this.checkingHashWord()

  },
  watch: {
    [`$store.state.lastSetHashword`]() {
      if (this.mind._hashword || this.$store.state.lastSetHashword !== this.mind.hashed_id)
        return

      this.mind._hashword = this.$store.state.getHashword(this.mind.hashed_id)
      this.parentGotHashword()
    }
  },
}
</script>


<style scoped>
.main-box {
  background-color: chocolate;
  padding: .7em;
  margin: 0.64rem;
  border-radius: 0.45rem;
//background-image: url("https://blog.1a23.com/wp-content/uploads/sites/2/2020/02/Desktop.png"); //background-image: url("https://wallpapercave.com/wp/wp2039805.jpg");
}

.mind-overview {
  position: relative;
}

.delete-mind {
  position: absolute;
  top: .3em;
  right: .3em;
//left: 98.5%; padding: .02em .2em; border-radius: 50%; background-color: red; opacity: .3; cursor: pointer;
}

.delete-mind:hover {
  opacity: 1;
}

.share-btn {
  position: absolute;
  top: 2.1em;
  right: -0.7em;
  border-radius: 3em;
  color: blue;
//left: 98.5%; padding: .02em .2em; border-radius: 50%; background-color: red; opacity: .3; cursor: pointer;
}

.share-btn:hover {
  opacity: 1;
}


.content-box {
  background-color: darkgoldenrod;
/*  padding: 1.5rem;*/
  margin: 0.3rem;
  border-radius: 0.45rem;
}

.changeable-input {
  margin: 0;
  background: none;
  border: none;
}

.caption {
  width: 100%;
/*  height: 6.4rem;*/
  padding: 0.56em 0.25em;
  overflow: auto;
  color: darkblue;
  font-weight: bold;
  font-size: 1.27rem;
  border-radius: 0.45rem;
}

.topic {
  width: 100%;
//max-height: 4.8rem; padding: 0.3em 0.8em 0.3em 0.36em; background-color: olive; overflow: auto; color: darkblue; font-weight: bold; font-size: 1.27rem; border-radius: 0.45rem;
}

.mind-btns {
  height: 3.3em;
}

.mind-btn {
  display: inline-block;
  margin: 0.625rem 1.4rem;
}

.mind-btn:hover {
  color: mediumblue;
  cursor: pointer;
}

.close-btn {
  margin-left: 1.6rem;
}

.access-btn {
  width: 2.3rem;
  text-align: center;
}

.hashing-btn {
  font-weight: bold;
  font-size: large;
}

.hashed-btn {
  font-weight: bold;
  font-size: large;
}

.hashed-btn:hover {
  color: rgb(33, 37, 41);
  cursor: default;
}

.set-hashword-btn {
  font-weight: bold;
  font-size: large;
}

/*.modal_enter_hashword {*/
/*  display: flex; !* Hidden by default *!*/
/*  position: fixed; !* Stay in place *!*/
/*  z-index: 1; !* Sit on top *!*/
/*  padding-top: 100px; !* Location of the box *!*/
/*  left: 0;*/
/*  top: 0;*/
/*  width: 100vw; !* Full width *!*/
/*  height: 100vh; !* Full height *!*/
/*  overflow: auto; !* Enable scroll if needed *!*/
/*  background-color: rgba(0, 0, 0, 0.5); !* Black w/ opacity *!*/
/*  justify-content: center;*/
/*  align-items: center;
}*/


</style>
