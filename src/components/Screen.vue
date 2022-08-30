<template>
  <div>
    <div v-if="!selectedFiles.length">
      <h3>Выберите директорию с изображениями{{ $store.selectedFiles }}</h3>
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
          {{ index }}
          <canvas id="canvas" ref="canvas"></canvas>
          <img :src="img_link" ref="pic" />
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
  data() {
    return {
      index: +localStorage.getItem("index") || 0,
      classScreen: {
        fill: false,
        oneOne: false,
        horiz: false,
        vert: false,
      },
      img_link: "",
    };
  },
  computed: {
    selectedScreen() {
      return this.$store.getters.selectedScreen;
    },
    fullScreen() {
      return this.$store.getters.fullScreen;
    },
    selectedFiles() {
      const files = this.$store.getters.selectedFiles;
      if (files.length < this.index) {
        console.log(+localStorage.getItem("index"))
        this.index = 0;
      }
      return files;
    },

    hasNext() {
      return this.index + 1 < this.selectedFiles.length;
    },
    hasPrev() {
      return this.index - 1 >= 0;
    },
  },

  watch: {
    selectedScreen: function (val, preval) {
      this.classScreen[preval] = false;
      this.classScreen[val] = true;
      this.getLocalImage();
    },
    index: function (val) {
      localStorage.setItem("index", val);
      this.getLocalImage();
    },
    selectedFiles: function () {
      this.getLocalImage();
    },
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
    getLocalImage() {
      if (this.selectedFiles.length) {
        this.img = new Image();
        this.img.src = window.URL.createObjectURL(
          this.selectedFiles[this.index]
        );

        this.img.onload = () => {
          this.imgWidth = this.img.naturalWidth;
          this.imgHeight = this.img.naturalHeight;
          this.imgRatio = this.imgWidth / this.imgHeight;
          this.W = window.innerWidth - 17;
          this.H = window.innerHeight;

          switch (this.selectedScreen) {
            case "fill":
              this.width = this.W;
              this.height = this.H;
              break;
            case "oneOne":
              this.width = this.imgWidth;
              this.height = this.imgHeight;
              break;
            case "horiz":
              this.width = this.W;
              this.height = this.width / this.imgRatio;
              break;
            case "vert":
              this.height = this.H;
              this.width = this.height * this.imgRatio;
              break;
          }

          window.URL.revokeObjectURL(this.img.src);
          this.c = this.$refs.canvas;
          this.c.width = this.width;
          this.c.height = this.height;
          this.ctx = this.c.getContext("2d");
          this.ctx.drawImage(this.img, 0, 0, this.width, this.height);
          this.img_link = canvas.toDataURL();
        };
      }
    },
  },

  mounted() {
    this.$store.dispatch("getImgs");
    window.addEventListener("keydown", this.onKeydown);
    this.classScreen[this.selectedScreen] = true;
    //this.index = +localStorage.getItem("index") || 0;
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
canvas {
  display: none;
}
</style>
