<template>
  <div  class="d-flex flex-column align-center">
    <div v-if="loading" class="spinner"></div>
  </div>
</template>

<script>
export default {
  name: 'Spinner',
  props: {
    loading: {
      required: true,
      type: Boolean,
    },
  },
};
</script>

<style>

</style>
