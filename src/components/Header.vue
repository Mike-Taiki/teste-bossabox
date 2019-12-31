<template>
  <div class="container m-percent">
    <header>
      <h1>VUTTR</h1>
      <h4>Very useful tools to remember</h4>
    </header>

    <section class="row d-flex space-between align-center mt-40">
      <form @submit.prevent class="d-flex align-center">
        <div class="box">
          <div class="search">
              <span class="icon"><font-awesome-icon icon="search" class="icon-search" /></span>
              <input
                type="search"
                id="search"
                @keyup.enter="searchTool"
                placeholder="Search..."
                v-model="textSearchTool"
              />
          </div>
        </div>

        <label class="personalized-checkbox">
          <input type="checkbox" v-model="tagsSelected">
          <span class="checkmark"></span>
          search in tags only
        </label>
      </form>

      <div class="d-flex flex-column flex-center">
        <button class="primary" @click="openModalAdd">
          <font-awesome-icon icon="plus" />
          Add
        </button>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Header',
  watch: {
    textSearchTool() {
      this.searchTool();
    },
    tagsSelected() {
      this.searchTool();
    },
  },
  data() {
    return {
      textSearchTool: '',
      tagsSelected: false,
    };
  },
  methods: {
    openModalAdd() {
      this.$emit('openModalAdd');
    },
    async searchTool() {
      // case only tags is selected
      if (this.tagsSelected) {
        await this.$store.dispatch('actionSearchTagsTool', this.textSearchTool);
        const tool = await this.$store.getters.getSearchTagsTool;
        if (tool.length) {
          this.$emit('toolExists', tool);
        } else {
          this.$emit('toolNotExists');
        }
        // case only common search
      } else if (this.textSearchTool) {
        await this.$store.dispatch('actionSearchTool', this.textSearchTool);
        const tool = await this.$store.getters.getSearchTool;
        if (tool.length) {
          this.$emit('toolExists', tool);
        } else {
          this.$emit('toolNotExists');
        }
      } else {
        // case blank search
        this.$emit('toolNotExistsButLoadTools');
      }
    },
  },
};
</script>

<style>

</style>
