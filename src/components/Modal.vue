<template>
    <div v-if="modalOpen" class="bg-body" @click="closeModal">
      <div class="modal" :style="{ top: top }">
        <slot></slot>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    modalOpen: {
      required: true,
      type: Boolean,
    },
    top: {
      required: true,
    },
  },
  methods: {
    closeModal() {
      this.$emit('closeModal');
    },
    removeTool() {
      this.$emit('removeTool');
    },
  },
};
</script>

<style>

</style>
