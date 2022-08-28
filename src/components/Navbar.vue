<template>
  <nav class="grey darken-3">
    <div class="nav-wrapper">
      <ul class="left" @click.stop="screenChooser">
        <li>
          <input
            type="file"
            id="file-input"
            accept="image/*,.pdf"
            multiple
            webkitdirectory
            directory
            @change="onFileSelecter"
          />
          <label for="file-input"
            ><i class="material-icons white-text">download</i></label
          >
        </li>
        <li :class="{ active: selectedScreen==='fill' }">
          <a><i class="material-icons" id="fill">zoom_out_map</i></a>
        </li>
        <li :class="{ active: selectedScreen==='1:1' }">
          <a><i id="1:1">1:1</i></a>
        </li>
        <li :class="{ active: selectedScreen==='horiz' }">
          <a><i class="material-icons" id="horiz">swap_horiz</i></a>
        </li>
        <li :class="{ active: selectedScreen==='vert' }">
          <a><i class="material-icons" id="vert">swap_vert</i></a>
        </li>
      </ul>
      <a v-if="!fullScreen" class="right" @click="fullScreen=!fullScreen"><i class="material-icons">fullscreen</i></a>
      <a v-else class="right" @click="fullScreen=!fullScreen"><i class="material-icons">fullscreen_exit</i></a>
    </div>
  </nav>
  <div>{{fullScreen}}
    <div v-if="!selectedFiles.length">Выберите директорию с изображениями</div>
    <div v-else>{{ selectedFiles[0] }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedFiles: [],
      selectedScreen: "fill",
      fullScreen: false,
    };
  },

  methods: {
    onFileSelecter(event) {
      const onlyImages = [...event.target.files].filter((file) =>
        /image|pdf/g.test(file.type)
      );
      this.selectedFiles = onlyImages;
    },
    screenChooser(event) {
      if (/fill|horiz|vert|1:1/g.test(event.target.id)) {
        this.selectedScreen = event.target.id;
      }
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
  margin-right: 40px;
}
label,
a:hover {
  cursor: pointer;
}
</style>
