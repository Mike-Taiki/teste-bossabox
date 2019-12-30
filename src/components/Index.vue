<template>
  <div>
    <Header @openModalAdd="openModalAdd" @toolExists="searchTool" @toolNotExists="getTools" />
    <Products @openModal="openModal" :tools="tools" @remove="openModal" :noData="noData" />
    <Modal :modalOpen="modalOpen" @closeModal="closeModal" @removeTool="removeTool" :top="'38%'">
      <span class="btn-remove" style="cursor: inherit!important">
          <font-awesome-icon icon="times" class="icon-remove" />
          <span class="ml-5">Remove tool</span>
          <p class="mt-20">
            Are you sure you want to remove <span class="bold">{{ itemRemove.title }}</span>?
          </p>
      </span>
      <span class="d-flex flex-end mt-20">
        <button class="primary mr-5" @click="removeTool" >Yes, remove</button>
        <button class="danger" @click="closeModal">Cancel</button>
      </span>
    </Modal>

    <Modal :modalOpen="modalOpenAdd" :top="'14%'">
      <span class="btn-remove" style="cursor: inherit!important">
          <font-awesome-icon icon="plus" />
          <span class="ml-5">Add new tool</span>
      </span>

      <form @submit.prevent="addTool" class="mt-20">
        <label for="name">Tool Name</label>
        <div class="input d-flex flex-end mt-10">
          <input type="text" id="name" placeholder="tool name..." v-model="tool.title" />
        </div>

        <div class="mt-20">
          <label for="link">Tool Link</label>
          <div class="input d-flex flex-end mt-10">
            <input type="text" id="link" placeholder="tool link..." v-model="tool.link" />
          </div>
        </div>

        <div class="mt-20">
          <label for="description">Tool Description</label>
          <div class="textarea d-flex flex-end mt-10">
            <textarea
              id="description"
              cols="30"
              rows="20"
              placeholder="description..."
              v-model="tool.description" />
          </div>
        </div>

        <div class="mt-20">
          <label for="tags">Tags</label>
          <div class="input d-flex flex-end mt-10">
            <input type="text" id="tags" placeholder="tags..." v-model="tool.tags" >
          </div>
        </div>

        <span class="d-flex flex-end mt-20">
        <button class="primary" type="submit">Add tool</button>
      </span>
      </form>
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
      modalOpenAdd: false,
      itemRemove: {},
      tool: {
        tags: [],
      },
    };
  },
  created() {
    this.actionTools();
  },
  methods: {
    openModal(item) {
      this.modalOpen = true;
      this.itemRemove = item;
      this.id = item.id;
    },
    closeModal() {
      this.modalOpen = false;
    },
    async getTools() {
      this.tools = this.$store.getters.getTools;
      this.modalOpenAdd = false;
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
    openModalAdd() {
      this.modalOpenAdd = true;
    },
    closeModalAdd() {
      this.modalOpenAdd = false;
    },
    async addTool() {
      await this.$store.dispatch('actionAddTool', this.tool);
      this.getTools();
    },
    async searchTool(tool) {
      this.tools = tool;
    },
  },
};
</script>

<style>

</style>
