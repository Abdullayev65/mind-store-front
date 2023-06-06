<template>

  <h2>total count : {{ totalCount }}</h2>

  <div class="container">
    <div class="row">

        <div class="articles card">

          <div class="card-body no-padding">
            <SearchUserListItem v-for="user in users" :user="user" />
          </div>
        </div>

    </div>
  </div>

  <div class="container">
    <button @click="page--"
            :disabled="page<2"
        class="previous pagination-btns">&laquo; Previous</button>
    <button @click="page++"
            :disabled="page>=totalCount/10"
        class="next pagination-btns">Next &raquo;</button>
  </div>


</template>

<script>
import SearchUserListItem from "@/components/SearchUserListItem.vue";

export default {
  components: {
    SearchUserListItem,
  },
  data() {
    return {
      users: [],
      username: '',
      page: 1,
      totalCount: 0,
    }
  },
  methods: {
    updateUrlFields() {
      if (this.$route.query.username && this.$route.query.username !== this.username) {
        this.username = this.$route.query.username
      }
      if (this.$route.query.page && this.$route.query.page !== this.page) {
        this.page = this.$route.query.page
      }
    },
    loadUsers() {
      this.$store.dispatch('searchUsers', {username: this.username, page: this.page})
          .then((data) => {
            this.totalCount = data.count
            const users = data.res
            for (let i = 0; i < users.length; i++) {
              if (!users[i].last_name)
                users[i].last_name = ''
            }

            this.users = users
          })
    },
  },
  mounted() {
    this.updateUrlFields()
  },
  watch: {
    $route(to, from) {
      this.updateUrlFields()
    },
    username() {
      this.loadUsers()
    },
    page() {
      this.loadUsers()
    },
  },
}
</script>


<style scoped>

.pagination-btns {
  text-decoration: none;
  display: inline-block;
  padding: 8px 16px;
  cursor: pointer;
}

.pagination-btns:hover {
  background-color: #ddd;
  color: black;
}

.pagination-btns[disabled] {
  background-color: #494d55;
}

.previous {
  background-color: #f1f1f1;
  color: black;
  border-radius: 1rem;
}

.next {
  background-color: #f1f1f1;
  color: black;
  border-radius: 1rem;
}

</style>