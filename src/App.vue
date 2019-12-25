<template>
  <div>
    <Header />
    <Products @openModal="openModal" :tools="tools" @remove="openModal" :noData="noData" />
    <Modal :modalOpen="modalOpen" @closeModal="closeModal" @removeTool="removeTool" />
  </div>
</template>

<script>
import Products from './components/Products.vue';
import Header from './components/Header.vue';
import Modal from './components/Modal.vue';

export default {
  components: { Header, Products, Modal },
  data() {
    return {
      modalOpen: false,
      id: null,
      tools: [],
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

<style lang="scss">
</style>
