<template>
    <div v-if="modalOpen" class="bg-body">
      <div class="modal">
          <span class="btn-remove" style="cursor: inherit!important">
              <font-awesome-icon icon="times" class="icon-remove" />
              <span class="ml-5">Remove tool</span>
              <p class="mt-20">Are you sure you want to remove hotel?</p>
          </span>
          <span class="d-flex flex-end mt-20">
            <button class="primary mr-5" @click="removeTool" >Yes, remove</button>
            <button class="danger" @click="closeModal">Cancel</button>
          </span>
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
