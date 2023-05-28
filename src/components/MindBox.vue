<template>

  <div class="main-box">
    <div @click="clickOnTopic">
    <textarea
        class="changeable-input topic"
        :disabled="!open"
        v-model="mind.topic"
        @focusout="handleFocusOut_topic"></textarea>
    </div>

    <div v-if="open">
      <div class="mind-btns">
        <i class="gg-chevron-up-o mind-btn close-btn"
           @click="clickOnClose"></i>

        <i class="fa-solid fa-2xl mind-btn access-btn"
           :class="mind.access==99?'fa-users':'fa-user'"
           @click="clickOnAccess">
        </i>
        <i v-if="mind._can_hash" class="mind-btn hashing-btn">h#shing</i>
        <i v-if="mind.hashed_id" class="mind-btn hashed-btn">h#shed</i>
      </div>


      <div class="content-box">
        <textarea
            class="caption changeable-input"
            v-model="mind.caption"
            @focusout="handleFocusOut_caption"></textarea>
      </div>
    </div>
  </div>

</template>

<script>
import {mapState} from "vuex";

export default {
  props: {
    mind: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      open: false,
      old_caption: this.mind.caption,
      old_topic: this.mind.topic,
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
      if (this.old_caption === this.mind.caption)
        return
      this.updateMind({caption: this.mind.caption})
          .then(() => {
            this.old_caption = this.mind.caption;
          })
    },
    handleFocusOut_topic(focusEvent) {
      if (this.old_topic === this.mind.topic)
        return
      this.updateMind({topic: this.mind.topic})
          .then(() => {
            this.old_topic = this.mind.topic
          })
    },
    clickOnTopic(event) {
      this.open = true
      this.loadSubMindsIfNotLoaded()
    },
    clickOnClose(e) {
      this.open = false
    },
    clickOnAccess(e) {
      let access = this.mind.access === 33 ? 99 : 33
      this.mind.access = access
      this.updateMind({access})
    },
  },
  mounted() {
  },
}
</script>


<style scoped>
.main-box {
  background-color: chocolate;
  padding: 1rem;
  margin: 0.64rem;
  border-radius: 0.45rem;
}

.content-box {
  background-color: darkgoldenrod;
  padding: 1.5rem;
  margin: 0.3rem;
  border-radius: 0.45rem;
}

.changeable-input {
  margin: 0;
  resize: none;
  background: none;
  border: none;
}

.caption {
  width: 100%;
  height: 6.4rem;
  padding: 0.25em;
  overflow: auto;
  color: darkblue;
  font-weight: bold;
  font-size: 1.27rem;
  border-radius: 0.45rem;
}

.topic {
  width: 100%;
  height: 4.8rem;
  padding: 0.4em 0.66em;
  background-color: olive;
  overflow: auto;
  color: darkblue;
  font-weight: bold;
  font-size: 1.27rem;
  border-radius: 0.45rem;
}

.mind-btns {
  display: inline-block;
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


</style>
