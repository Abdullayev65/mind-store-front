<template>

  <h2 v-if="!subMindsLoaded">Loading...</h2>
  <div v-else>
    <MindBox v-for="mind in parentMind.sub_minds" :mind="mind"/>

    <div class="add-mind-box">

        <label class="filled add-mind-label">
          <input class="add-mind-input "
                 type="text" required
                 v-model="newTopic"
                 v-on:keyup.enter="makeNewTopic"
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
  components: {MindBox},
  data() {
    return {
      subMindsLoaded: false,
      parentMind: null,
      newTopic: '',
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
  methods: {
    makeNewTopic() {
      const newTopic = this.newTopic
      this.newTopic = ''
      if (!newTopic)
        return

      const newMind = {
        topic : newTopic,
        parent_id : this.parentMindId,
        access : this.parentMind.access,
      }
      if (this.parentMind.hashed_id) {
        newMind.hashed_id = this.parentMind.hashed_id
        newMind.topic = dataHasher.hash(this.parentMind._hashword, newMind.topic)
      }


      this.$store.dispatch('createMind', newMind)
          .then(() => {
            this.parentMind.sub_minds.push(newMind)
          })
          .catch((err) => {
            alert(err)
            this.newTopic = newTopic
          })
    },
  },
  mounted() {
    this.$store.dispatch('getById', this.parentMindId)
        .then((m) => {
          this.parentMind = this.mindsMap.get(this.parentMindId)
          this.subMindsLoaded = true
        })
        .catch((err) => {
          alert(err)
        })
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


.add-mind-label{
  position: relative;
  width: 99%;
  > span{
    &::after,
    &::before{
      position: absolute;
      transition: 200ms ease-in-out;
    }
    &::before{
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
  > input{
    &:focus,
    &:valid{
      ~ span{
        &::before{
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
  &:active{
    outline: 0;
    border: 0;
  }
}

.filled{
  border-bottom: 1px solid rgba(0,0,0,.42);
  > input{
    background-color: darkslategrey;
    border-radius: 4px 4px 0 0;
    &:hover{
      background-color: rgba(0,0,0,0.08);
    }
    &:focus,
    &:valid{
      ~ span{
        &::before{
          transform: translateY(-12px);
          font-size: 12px;
          color: yellowgreen;
        }
        &::after{
          width: 100%;
        }
      }
    }
  }
  > span{
    &::after{
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

</style>