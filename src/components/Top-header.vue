<template>
  <div>
    Logged In
    <span v-if="loggedIn">Yes</span>
    <span v-else>No</span>
    <div>
      <button @click="signout">Sign Out</button>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
    });
  },
  data() {
    return {
      loggedIn: false
    };
  },
  methods: {
    async signout() {
      try {
        const data = await firebase.auth().signOut();
        console.log(data);
        this.$router.replace({ name: "login" });
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
