import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSocketIO from 'vue-socket.io'
// const io = require("socket.io-client");

// const socket = io("https://cariobat-server.herokuapp.com", {
//   withCredentials: true,
//   extraHeaders: {
//     "my-custom-header": "abcd"
//   }
// });
// Vue.config.productionTip = false

Vue.use(new VueSocketIO({
  debug: true,
  connection: 'https://cariobat-server.herokuapp.com',
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  },
}));
// Vue.use(VueSocketIO, socket);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
