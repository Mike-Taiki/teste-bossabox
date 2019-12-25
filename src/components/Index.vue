<template>
  <div>
    <Header />
    <Products @openModal="openModal" :tools="tools" @remove="openModal" :noData="noData" />
    <Modal :modalOpen="modalOpen" @closeModal="closeModal" @removeTool="removeTool">
      <span class="btn-remove" style="cursor: inherit!important">
          <font-awesome-icon icon="times" class="icon-remove" />
          <span class="ml-5">Remove tool</span>
          <p class="mt-20">Are you sure you want to remove hotel?</p>
      </span>
      <span class="d-flex flex-end mt-20">
        <button class="primary mr-5" @click="removeTool" >Yes, remove</button>
        <button class="danger" @click="closeModal">Cancel</button>
      </span>
    </Modal>
  </div>
</template>

<script>
import Products from './Products.vue';
import Header from './Header.vue';
import Modal from './Modal.vue';

export default {
  name: 'Index',
  components: { Header, Products, Modal },
  data() {
    return {
      modalOpen: false,
      id: null,
      tools: null,
      noData: null,
    };
  },
  created() {
    this.actionTools();
  },
  methods: {
    openModal(id) {
      this.modalOpen = true;
      this.id = id;
    },
    closeModal() {
      this.modalOpen = false;
    },
    async getTools() {
      this.tools = await this.$store.getters.getTools;
      if (!this.tools.length) {
        this.noData = ':( No Tool registered';
      }
    },
    async actionTools() {
      await this.$store.dispatch('actionTools');
      this.getTools();
    },
    async remove(id) {
      await this.$store.dispatch('actionRemoveTool', id);
      this.tools = this.getTools();
      this.modalOpen = false;
    },
    removeTool() {
      this.remove(this.id);
    },
  },
};
</script>

<style>

</style>
