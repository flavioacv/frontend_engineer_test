<template>
  <div class="shimmer-wrapper">
    <div class="shimmer"></div>
  </div>
</template>

<style scoped>
.shimmer-wrapper {
  width: 100%;
  height: 100%;
  background: #f6f7f8;
  position: relative;
  overflow: hidden;
  border-radius: 5px;
}

.shimmer {
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #f6f7f8 25%, #e2e2e2 50%, #f6f7f8 75%);
  background-size: 200% 100%;
  position: absolute;
  top: 0;
  left: 0;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    background-position: -100% 0;
  }
  100% {
    background-position: 100% 0;
  }
}
</style>
