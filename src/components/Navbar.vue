<template>
  <nav class="grey darken-3">
    <div class="nav-wrapper">
      <ul class="left">
        <li>
          <input
            type="file"
            id="file-input"
            accept="image/*,.pdf"
            multiple
            webkitdirectory
            directory
          />
          <label for="file-input"
            ><i class="material-icons white-text">download</i></label
          >
        </li>

        <li>
          <a><i class="material-icons">zoom_out_map</i></a>
        </li>
        <li class="active"><a>1:1</a></li>
        <li>
          <a><i class="material-icons">swap_horiz</i></a>
        </li>
        <li>
          <a><i class="material-icons">swap_vert</i></a>
        </li>
      </ul>
      <a class="right"><i class="material-icons">fullscreen</i></a>
    </div>
  </nav>
</template>

<script>
export default {};
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
</style>
