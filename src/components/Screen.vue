<template>
  <div>
    <div v-if="!selectedFiles.length">
      <h3>Выберите директорию с изображениями</h3>
    </div>
    <div v-else class="lightbox">
      <div class="lightbox-container">
        <div @click="prev" class="arrow prev" v-if="hasPrev">
          <svg
            fill="#fff"
            height="48"
            viewBox="0 0 24 24"
            width="48"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z" />
            <path d="M0-.5h24v24H0z" fill="none" />
          </svg>
        </div>
        <div class="lightbox-image">
          <img :src="selectedFiles[index].webkitRelativePath" />
        </div>
        <div @click="next" class="arrow next" v-if="hasNext">
          <svg
            fill="#fff"
            height="48"
            viewBox="0 0 24 24"
            width="48"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z" />
            <path d="M0-.25h24v24H0z" fill="none" />
          </svg>
        </div>
      </div>
    </div>
  </div>
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
    selectedFiles() {
      return this.$store.getters.selectedFiles;
    },
    hasNext() {
      return this.index + 1 < this.selectedFiles.length;
    },
    hasPrev() {
      return this.index - 1 >= 0;
    },
  },
  data() {
    return {
      index: 0,
    };
  },
  methods: {
    prev() {
      if (this.hasPrev) {
        this.index -= 1;
      }
    },
    next() {
      if (this.hasNext) {
        this.index += 1;
      }
    },
    onKeydown(e) {
      switch (e.key) {
        case "ArrowRight":
          this.next();
          break;
        case "ArrowLeft":
          this.prev();
          break;
        case "ArrowDown":
        case "ArrowUp":
        case " ":
          e.preventDefault();
          break;
      }
    },
  },
  mounted() {
    window.addEventListener("keydown", this.onKeydown);
  },
  unmounted() {
    window.removeEventListener("keydown", this.onKeydown);
  },
};
</script>

<style lang="scss" scoped>
h3 {
  margin: 10px;
}
.lightbox {
  background: rgba(0, 0, 0, 0.8);
  height: 100vh;
}
.lightbox-container {
  display: flex;
  align-content: center;
  justify-content: center;
}
.lightbox-image img {
  width: 100%;
  height: auto;
}
.arrow {
  position: absolute;
  z-index: 10;
}
.prev {
  left: 0;
}
.next {
  right: 0;
}
</style>
