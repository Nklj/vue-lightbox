<template>
  <main>
    <Navbar />
    <Screen />
  </main>
</template>

<script>
import Navbar from "@/components/Navbar";
import Screen from "@/components/Screen";
export default {
  components: { Navbar, Screen },
};
</script>

<style lang="scss">
@import "~materialize-css/dist/css/materialize.min.css";
</style>
