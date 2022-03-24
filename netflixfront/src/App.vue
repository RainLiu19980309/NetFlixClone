<template>
  <section class="app-wrapper">
    <header class="col-sm-12 roku-header">
      <img src="@/assets/images/roku.svg" alt="Roku logo" width="150"><span>FlashBack</span>
      <nav class="float-right">
      <ul v-if="authenticated"> 
        <!-- switch users -->           
        <li @click="switchUser"><i class="fas fa-user-circle"></i></li>
        <!-- user settings, but only if you're an admin -->
        <li><i class="fas fa-cog"></i></li>
        <!-- log out -->
        <li @click="logOut"><i class="fas fa-power-off"></i></li>					
      </ul>
      </nav>
    </header>

    <router-view @setauth="setAuthenticated"></router-view>
  </section>
</template>

<script>
export default {
  name: "TheRokuFlashbackApp",

  created() {
    if (localStorage.getItem('user')) {
      this.$router.push({name: 'UserHome', params: JSON.parse(localStorage.getItem('user')) });
    }
  },

  data() {
    return {
      authenticated: false
    }
  },

  methods: {
    setAuthenticated(status) {
      this.authenticated = status;
    },

    logOut() {
      // destory the localStorage user object
      if (localStorage.getItem('user')) {
        // delete the saved user
        localStorage.removeItem('user');
      }

      //  not authenticated any more
      this.setAuthenticated(false);
      this.$router.push({ name: 'Login' });
    },

    switchUser() {
      this.$router.push({ name: 'UserSelect' });
    }
  }
}
</script>

<style lang="scss">
  @import "@/assets/sass/main.scss";
</style>
