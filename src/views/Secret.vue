<template>
  <div>
    <h1>Login Page</h1>
    <form @submit.prevent="onSignInSubmit">
      <div class="login">
        <input type="text" placeholder="+91" v-model="number" />
      </div>
      <div id="recaptcha-container"></div>
      <button type="submit">Login</button>
    </form>
    <h1>Enter Verification code</h1>
    <form @submit.prevent="onSubmitOtp">
      <input type="text" placeholder="Enter Verification Code" v-model="otp" />
      <button type="submit">Verify Code</button>
    </form>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  methods: {
    setUpRecaptcha() {
      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: function() {
            console.log("Captcha Resolved");
            this.onSignInSubmit();
          },
          defaultCountry: "IN"
        }
      );
    },
    onSignInSubmit() {
      this.setUpRecaptcha();
      let phoneNumber = "+91" + this.number;
      console.log(phoneNumber);
      let appVerifier = window.recaptchaVerifier;
      firebase
        .auth()
        .signInWithPhoneNumber(phoneNumber, appVerifier)
        .then(function(confirmationResult) {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          window.confirmationResult = confirmationResult;
          // console.log(confirmationResult);
          console.log("OTP is sent");
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    onSubmitOtp() {
      let otpInput = this.otp;
      let optConfirm = window.confirmationResult;
      // console.log(codee);
      optConfirm
        .confirm(otpInput)
        .then(function(result) {
          // User signed in successfully.
          // console.log("Result" + result.verificationID);
          let user = result.user;
          console.log(user);
          alert("Logged In success");
        })
        .catch(function(error) {
          console.log(error);
          alert("Incorrect OTP");
        });

      this.$router.replace({ name: "/register" });
    }
  },
  data() {
    return {
      number: "",
      otp: ""
    };
  }
};
</script>

<style lang="scss" scoped></style>
