<template>
  <div id="app">
    <Navbar></Navbar>
    <router-view/>
    <HFooter></HFooter>
  </div>
</template>
<script>
import HFooter from 'vue-hacktiv8-footer'
import Navbar from "./components/Navbar.vue"
export default {
  components: {
    HFooter,
    Navbar
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
