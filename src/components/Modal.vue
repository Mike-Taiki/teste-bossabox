<template>
    <div v-if="modalOpen" class="bg-body">
      <div class="modal">
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
