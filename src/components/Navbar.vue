<template>
  <nav class="grey darken-3">
    <div class="nav-wrapper">
      <ul class="left" @click="screenChooser">
        <li>
          <input
            type="file"
            id="file-input"
            accept="image/*"
            multiple
            webkitdirectory
            directory
            @change="onFileSelecter"
          />
          <label for="file-input"
            ><i class="material-icons white-text">download</i></label
          >
        </li>
        <li :class="{ active: selectedScreen === 'fill' }">
          <a><i class="material-icons" id="fill">zoom_out_map</i></a>
        </li>
        <li :class="{ active: selectedScreen === 'oneOne' }">
          <a><i id="oneOne">1:1</i></a>
        </li>
        <li :class="{ active: selectedScreen === 'horiz' }">
          <a><i class="material-icons" id="horiz">swap_horiz</i></a>
        </li>
        <li :class="{ active: selectedScreen === 'vert' }">
          <a><i class="material-icons" id="vert">swap_vert</i></a>
        </li>
      </ul>
      <a v-if="!fullScreen" class="right" @click="fullScreenToggle"
        ><i class="material-icons">fullscreen</i></a
      >      
    </div>
  </nav>
</template>

<script>
export default {
  computed: {
    selectedScreen() {
      return this.$store.getters.selectedScreen;
    },
    fullScreen() {
      return this.$store.getters.fullScreen;
    },
  },

  methods: {
    onFileSelecter(event) {
      const onlyImages = [...event.target.files].filter((file) =>
        /image/g.test(file.type)
      );
   
      this.$store.dispatch("uploudFiles", onlyImages);
    },
    screenChooser(event) {
      if (/fill|horiz|vert|oneOne/g.test(event.target.id)) {
       
        this.$store.dispatch("updateSelectedScreen", event.target.id);
      }
    },
    fullScreenToggle() {
      this.$store.dispatch("updateFullScreen");
    },
  },
};
</script>

<style lang="scss" scoped>
nav {
  padding: 0 2rem;
}
.nav-wrapper {
  max-width: 600px;
  margin: 0 auto;
}
input[type="file"] {
  display: none;
}
li:first-child {
  margin-right: 30px;
}
label,
a:hover {
  cursor: pointer;
}
</style>
