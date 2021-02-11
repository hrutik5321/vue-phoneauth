<template>
  <div>
    <div class="error" v-if="error">{{ error.message }}</div>
    <form @submit.prevent="pressed">
      Register

      <div class="email">
        <input type="email" v-model="email" placeholder="email" />
      </div>
      <div class="password">
        <input type="password" v-model="password" placeholder="password" />
      </div>
      <div class="adress">
        <input type="text" v-model="adress" placeholder="adress" />
      </div>
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      email: "",
      password: "",
      error: "",
      adress: ""
    };
  },
  methods: {
    async pressed() {
      try {
        const user = firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password);
        console.log(user);
        const firestore = firebase.firestore();
        const adress = firestore.collection("adress");
        const add = adress.add({ adress: this.adress });
        console.log(add);
        this.$router.replace({ name: "secret" });
      } catch (error) {
        console.log(error.message);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.error {
  color: red;
  font-size: 18px;
}
input {
  width: 400px;
  padding: 30px;
  margin: 20px;
  font-size: 21px;
}
button {
  width: 400px;
  height: 75px;
  font-size: 100%;
}
</style>
