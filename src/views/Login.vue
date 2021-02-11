<template>
  <div>
    <h1>Login Page</h1>
    <form @submit.prevent="pressed">
      <div class="login">
        <input type="text" placeholder="+91" v-model="email" />
      </div>
      <div class="recapcha-container"></div>
      <button type="submit">Login</button>
    </form>
    <h1>Enter Verification code</h1>
    <form @submit.prevent="verify">
      <input type="text" placeholder="Enter Verification Code" />
      <button type="submit">Verify Code</button>
    </form>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  mounted() {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "recapcha-container",
      {
        size: "invisible",
        callback: () => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          this.onSignInSubmit();
        }
      }
    );
  },
  methods: {
    async pressed() {
      try {
        const val = await firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password);
        console.log(val);
        this.$router.replace({ name: "secret" });
      } catch (err) {
        console.log(err);
      }
    },
    onSignInSubmit() {
      const appVerifier = window.recaptchaVerifier;
      firebase
        .auth()
        .signInWithPhoneNumber(this.email, appVerifier)
        .then(confirmationResult => {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          window.confirmationResult = confirmationResult;
          // ...
        })
        .catch(error => {
          // Error; SMS not sent
          // ...
          console.log(error);
        });
    }
  },
  data() {
    return {
      email: "",
      password: "",
      error: ""
    };
  }
};
</script>

<style lang="scss" scoped></style>
