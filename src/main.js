import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import firebase from "firebase/app";

Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyChuHTNycR_jMdlPG9CzmwTeYGiJwKnvzc",
  authDomain: "vue-firebase-1b1fa.firebaseapp.com",
  projectId: "vue-firebase-1b1fa",
  storageBucket: "vue-firebase-1b1fa.appspot.com",
  messagingSenderId: "582110333665",
  appId: "1:582110333665:web:bcff274efb5ba874cb85a0"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
