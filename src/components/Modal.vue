<template>
    <div v-if="modalOpen" class="bg-body" id="modal">
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
  created() {
    this.escPressed();
  },
  updated() {
    this.clickOutModal();
  },
  methods: {
    closeModal() {
      this.$emit('closeModal');
    },
    removeTool() {
      this.$emit('removeTool');
    },
    escPressed() {
      document.addEventListener('keyup', (e) => {
        if (e.key === 'Escape') {
          this.closeModal();
        }
      });
    },
    clickOutModal() {
      const modal = document.getElementById('modal');
      if (modal) {
        modal.addEventListener('click', (e) => {
          const classModal = e.target.classList.value;
          if (classModal === 'bg-body') {
            this.closeModal();
          }
        });
      }
    },
  },
};
</script>

<style>

</style>
