<template>
  <div>
    <v-progress-circular indeterminate :size="50" class="mb-8" />
    <div>Loading...</div>
  </div>
</template>

<script>
export default {
  name: "LoadingSpinner",
};
</script>
