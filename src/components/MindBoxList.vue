<template>

  <h2 v-if="!subMindsLoaded">Loading...</h2>
  <div v-else :class="'level level-' + (mindLvl%5)">
    <MindBox
        v-for="mind in parentMind.sub_minds"
        :parentGotHashword="this['_got_hashword_id_' + mind.hashed_id]"
        @gotHashword="gotHashword"
        :mind="mind">
      <MindBoxList
          :gotHashwordIdParent="this['_got_hashword_id_' + mind.hashed_id]"
          :parentGotHashword="gotHashwordId"
          :parent-mind-id="mind.id"
          :mind-lvl="mindLvl+1"/>
    </MindBox>

    <div class="add-mind-box">

      <label class="filled add-mind-label">
        <input class="add-mind-input "
               id="add-new-topic"
               type="text" required
               v-model="newTopic"
               v-on:keyup.enter="enterNewTopic"
               @focusout="makeNewTopic">
        <span data-label="Enter new topic"></span>
      </label>

    </div>

  </div>

</template>

<script>
import {mapState} from "vuex";
import MindBox from "@/components/MindBox.vue";
import dataHasher from "@/helpers/dataHasher";

export default {
  name: "MindBoxList",
  components: {MindBox},
  data() {
    return {
      subMindsLoaded: false,
      parentMind: null,
      newTopic: '',
      gotHashwordId: '',
    }
  },
  props: {
    parentMindId: {
      type: String,
      required: true
    },
    mindLvl: {
      type: Number,
      default: 0,
    },
    parentGotHashword: {
      type: Boolean,
    },
    gotHashwordIdParent: {
      type: Object,
    },
  },
  computed: {
    ...mapState({
      mindsMap: state => state.mind.mindsMap
    }),
  },
  methods: {
    enterNewTopic() {
      document.getElementById('add-new-topic').blur();
      this.makeNewTopic()
    },
    makeNewTopic() {

      const newTopic = this.newTopic
      this.newTopic = ''
      if (!newTopic)
        return

      const newMind = {
        topic: newTopic,
        parent_id: this.parentMindId,
        access: this.parentMind.access,
      }
      if (this.parentMind.hashed_id) {
        newMind.hashed_id = this.parentMind.hashed_id
        newMind._hashword = this.mindsMap.get(this.parentMindId)._hashword
        newMind.topic = dataHasher.hash(newMind._hashword, newMind.topic)
      }


      this.$store.dispatch('createMind', newMind)
          .then(() => {
            console.log(newMind)
            this.parentMind.sub_minds.push(newMind)
          })
          .catch((err) => {
            alert(err)
            // this.newTopic = newTopic
          })
    },
    gotHashword(hashed_id) {
      this.set_got_hashword_id(hashed_id, hashed_id)
    },
    set_got_hashword_id(hashed_id, val) {
      this['_got_hashword_id_' + hashed_id] = val
    }
  },
  mounted() {
    this.$store.dispatch('getById', this.parentMindId)
        .then((m) => {
          this.parentMind = this.mindsMap.get(this.parentMindId)
          if (this.parentMind.sub_minds) {
            let sub_minds = this.parentMind.sub_minds
            for (let idx in sub_minds) {
              this.set_got_hashword_id(sub_minds[idx].hashed_id, false)
            }
          }

          this.subMindsLoaded = true
        })
        .catch((err) => {
          alert(err)
        })
  },
  watch: {
    gotHashwordIdParent() {
      this.set_got_hashword_id(this.gotHashwordIdParent, this.gotHashwordIdParent)
    }
  }
}
</script>


<style scoped>

.add-mind-box {
  background-color: darkslategrey;
  padding: 1rem;
  margin: 0.64rem;
  border-radius: 0.45rem;
  text-align: center;
}


.add-mind-label {
  position: relative;
  width: 99%;

  > span {
    &::after,
    &::before {
      position: absolute;
      transition: 200ms ease-in-out;
    }

    &::before {
      content: attr(data-label);
      left: 16px;
      top: 0;
      bottom: 0;
      margin: auto;
      pointer-events: none;
      height: 18px;
      font-size: 18px;
      color: gray;
      line-height: 1;
    }
  }

  > input {
    &:focus,
    &:valid {
      ~ span {
        &::before {
          font-size: 12px;
          color: yellowgreen;
        }
      }
    }
  }
}

.add-mind-input {
  width: 100%;
  border: 0;
  height: 56px;
  padding: 20px 16px 6px;
  font-size: 16px;

  &:focus,
  &:active {
    outline: 0;
    border: 0;
  }
}

.filled {
  border-bottom: 1px solid rgba(0, 0, 0, .42);

  > input {
    background-color: darkslategrey;
    border-radius: 4px 4px 0 0;

    &:hover {
      background-color: rgba(0, 0, 0, 0.08);
    }

    &:focus,
    &:valid {
      ~ span {
        &::before {
          transform: translateY(-12px);
          font-size: 12px;
          color: yellowgreen;
        }

        &::after {
          width: 100%;
        }
      }
    }
  }

  > span {
    &::after {
      content: '';
      width: 0;
      height: 1px;
      background-color: yellowgreen;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      transition: 300ms;
    }
  }
}

.level-0 {
  background-color: darkcyan;
  padding: .1em;
  border-radius: 1em;
  margin-left: .4em;
}

.level-1 {
  background-color: yellowgreen;
  padding: .1em;
  border-radius: 1em;
  margin-left: .4em;
}

.level-2 {
  background-color: steelblue;
  padding: .1em;
  border-radius: 1em;
  margin-left: .4em;
}

.level-3 {
  background-color: mediumblue;
  padding: .1em;
  border-radius: 1em;
  margin-left: .4em;
}

.level-4 {
  background-color: darkgreen;
  padding: .1em;
  border-radius: 1em;
  margin-left: .4em;
}

.level {
  margin-left: 1.3em;
}

</style>