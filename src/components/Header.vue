<template>
  <div class="container m-percent">
    <header>
      <h1>VUTTR</h1>
      <h4>Very useful tools to remember</h4>
    </header>

    <section class="row d-flex space-between align-center mt-40">
      <div class="search">
        <span class="text-search">
          <font-awesome-icon icon="search" class="icon-search" />
          <input type="text" placeholder="Digite o que está procurando…">
        </span>
      </div>

      <label class="personalized-checkbox">
        <input type="checkbox">
        <span class="checkmark"></span>
        search in tags only
      </label>

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
  methods: {
    openModalAdd() {
      this.$emit('openModalAdd');
    },
  },
};
</script>

<style>

</style>
