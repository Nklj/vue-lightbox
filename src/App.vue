<template>
  <main ref="main">
    <Navbar />
    <Screen />
  </main>
</template>

<script>
import Navbar from "@/components/Navbar";
import Screen from "@/components/Screen";
export default {
  components: { Navbar, Screen },
  computed: {
    fullScreen() {
      return this.$store.getters.fullScreen;
    },
  },
  watch: {
    fullScreen: function (val) {
      if (val) {
        this.openFullscreen();
        this.fullScreenToggle();
      }
    },
  },
  methods: {
    openFullscreen() {
      if (this.$refs.main.requestFullscreen) {
        this.$refs.main.requestFullscreen();
      } else if (this.$refs.main.webkitRequestFullscreen) {
        /* Safari */
        this.$refs.main.webkitRequestFullscreen();
      } else if (this.$refs.main.msRequestFullscreen) {
        /* IE11 */
        this.$refs.main.msRequestFullscreen();
      }
    },
    fullScreenToggle() {
      this.$store.dispatch("updateFullScreen");
    },
  },
};
</script>

<style lang="scss">
@import "~materialize-css/dist/css/materialize.min.css";
</style>

