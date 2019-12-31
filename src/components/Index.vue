<template>
  <div>
    <Header
      @openModalAdd="openModalAdd"
      @toolExists="searchTool"
      @toolNotExists="toolNotExists"
      @toolNotExistsButLoadTools="getTools"
    />
    <Products
      @openModal="openModal"
      :tools="tools"
      @remove="openModal"
      :noData="noData"
      :textSearch="textSearch"
    />
    <Modal :modalOpen="modalOpen" @closeModal="closeModal" @removeTool="removeTool" :top="'30%'">
      <div class="d-flex space-between align-center">
        <span class="btn-remove" style="cursor: inherit!important">
            <font-awesome-icon icon="times" class="icon-remove" />
            <span class="ml-5">Remove tool</span>
        </span>
        <img
          src="../assets/Icon-Close-2px.png"
          width="10px"
          height="10px"
          alt="icon close"
          srcset=""
          class="icon-close"
          @click="closeModal">
      </div>
      <p class="mt-20 text-modal">
        Are you sure you want to remove <span class="bold">{{ itemRemove.title }}</span>?
      </p>
      <span class="d-flex flex-end mt-20">
        <button class="outline-danger mr-40" @click="closeModal">Cancel</button>
        <button class="primary" @click="removeTool" >Yes, remove</button>
      </span>
    </Modal>

    <Modal :modalOpen="modalOpenAdd" :top="'20%'" @closeModal="closeModal">
      <div class="d-flex space-between align-center">
        <span class="btn-remove" style="cursor: inherit!important">
            <font-awesome-icon icon="plus" />
            <span class="ml-5">Add new tool</span>
        </span>
        <img
          src="../assets/Icon-Close-2px.png"
          width="10px"
          height="10px"
          alt="icon close"
          srcset=""
          class="icon-close"
          @click="closeModal">
      </div>

      <form @submit.prevent="formValidation" class="mt-20">
        <label for="name">Tool Name</label>
        <div class="input d-flex flex-end mt-10">
          <input
            type="text"
            id="name"
            placeholder="tool name..."
            :class="{'input-invalid': titleValid}"
            @blur="validateBlur(tool.title, 'titleValid')"
            @input="validateInput(tool.title, 'titleValid')"
            v-model="tool.title" />
        </div>
            <span v-if="titleValid" class="message-error-field">This field is required</span>

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
              :class="{'input-invalid': descriptionValid}"
              @blur="validateBlur(tool.description, 'descriptionValid')"
              @input="validateInput(tool.title, 'descriptionValid')"
              v-model="tool.description" />
          </div>
            <span
              v-if="descriptionValid"
              class="message-error-field">
              This field is required
            </span>
        </div>
        <div class="mt-20">
          <vue-tags-input
            v-model="tag"
            :tags="tags"
            @tags-changed="newTags => tags = newTags"
            :add-on-key="[13,32,',', ';']"
          />
        </div>

        <span class="d-flex flex-end mt-20">
        <button class="primary" type="submit">Add tool</button>
      </span>
      </form>
    </Modal>
  </div>
</template>

<script>
import VueTagsInput from '@johmun/vue-tags-input';
import Products from './Products.vue';
import Header from './Header.vue';
import Modal from './Modal.vue';

export default {
  name: 'Index',
  components: {
    VueTagsInput,
    Header,
    Products,
    Modal,
  },
  data() {
    return {
      modalOpen: false,
      id: null,
      tools: null,
      noData: null,
      modalOpenAdd: false,
      itemRemove: {},
      tag: '',
      tags: [],
      tool: {
        tags: [],
      },
      textSearch: null,
      titleValid: false,
      descriptionValid: false,
    };
  },
  computed: {
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
      this.modalOpenAdd = false;
    },
    async getTools() {
      this.noData = null;
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
      this.getTools();
      this.modalOpen = false;
    },
    removeTool() {
      this.remove(this.id);
    },
    openModalAdd() {
      this.modalOpenAdd = true;
    },
    validateInput(property, validateClass) {
      if (!property) {
        this[validateClass] = true;
      } else {
        this[validateClass] = false;
      }
    },
    validateBlur(property, validateClass) {
      if (!property) {
        this[validateClass] = true;
      } else {
        this[validateClass] = false;
      }
    },
    addTags() {
      this.tags.forEach((el) => {
        this.tool.tags.push(el.text);
      });
      this.addTool();
    },
    formValidation() {
      if (this.tool.title && this.tool.description) {
        this.addTags();
      } else if (this.tool.title && !this.tool.description) {
        this.descriptionValid = true;
        this.titleValid = false;
      } else if (!this.tool.title && this.tool.description) {
        this.titleValid = true;
        this.descriptionValid = false;
      } else {
        this.titleValid = true;
        this.descriptionValid = true;
      }
    },
    async addTool() {
      await this.$store.dispatch('actionAddTool', this.tool);
      this.tool = { tags: [] };
      this.getTools();
    },
    async searchTool(tool, textSearch) {
      this.noData = null;
      this.tools = tool;
      this.textSearch = textSearch;
    },
    toolNotExists() {
      this.tools = [];
      this.noData = 'Sorry, tool not exists ;(';
    },
    separateTags(event) {
      this.tool.tags.push(event.target.value);
    },
  },
};
</script>

<style>

</style>
