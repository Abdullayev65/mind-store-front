<template>

  <div @click="clickOnUser"
      class="item d-flex align-items-center">
    <div class="image">
      <img :src="user.avatar_url" alt="..." class="img-fluid rounded-circle">
    </div>
    <div class="text"><a href="#">
      <h3 class="user-fullname">
        {{ user.first_name + " " + user.last_name }}
      </h3>
    </a>
      <small class="user-username" > {{user.username}} </small></div>
  </div>


</template>

<script>

export default {
  data() {
    return {
      username: '',
    }
  },
  methods: {
    clickOnUser() {
      // alert("")
      this.$router.push(`/${this.user.username}`)
    },
  },
  props: {
    user: {
      type: Object,
      required: true,
    }
  }
}
</script>


<style scoped>



.articles a {
  text-decoration: none !important;
  display: block;
  margin-bottom: 0;
  color: #555
}

.articles .badge {
  font-size: 0.7em;
  padding: 5px 10px;
  line-height: 1;
  margin-left: 10px
}

.articles .item {
  padding: 20px
}



.articles .item .image {
  min-width: 50px;
  max-width: 50px;
  height: 50px;
  margin-right: 15px
}

.articles .item img {
  padding: 3px;
  border: 1px solid #28a745
}

.user-fullname {
  color: #555;
  font-weight: 400;
  margin-bottom: 0
}

.user-username {
  color: #4F5760;
  font-size: 0.75em
}


.item {
  cursor: pointer;
  border-radius: 1rem;
}

.item:hover .user-fullname {
  color: darkblue;
}

.item:hover {
  background-color: #a2a6af;
}



</style>