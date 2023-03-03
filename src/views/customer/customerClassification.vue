<template>
  <div id="body">
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  name: 'customerClassification'
}
</script>

<style scoped lang="scss">
#body {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100vh;
  box-sizing: border-box;

  .content {
    width: 100%;
    height: calc(100% - 1.7rem);
    box-sizing: border-box;
  }
}
</style>
