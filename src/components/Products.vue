<template>
  <section>
    <Spinner :loading="!tools && !noData" />

    <div v-if="noData" class="d-flex container mt-40">
      <h3>{{ noData }}</h3>
    </div>

    <div v-if="tools" class="container">
      <div v-for="tool in tools" :key="tool.id" class="card">
        <div class="d-flex space-between">
          <h5 class="link">{{tool.title}}</h5>
          <span @click="remove(tool.id)" class="btn-remove">
            <font-awesome-icon icon="times" class="icon-remove" />
            <span class="ml-5">remove</span>
          </span>
        </div>
          <p class="mt-20">{{ tool.description }}</p>
          <p class="mt-10 tag">
            <span v-for="tag in tool.tags" :key="tag" class="mr-5">#{{ tag }}</span>
          </p>
      </div>
    </div>
  </section>
</template>

<script>
import Spinner from './Spinner.vue';

export default {
  name: 'Products',
  components: { Spinner },
  data() {
    return {
      tools: null,
      noData: null,
    };
  },
  async created() {
    this.actionTools();
  },
  methods: {
    async actionTools() {
      await this.$store.dispatch('actionTools');
      this.getTools();
    },
    async getTools() {
      this.tools = await this.$store.getters.getTools;
      if (!this.tools.length) {
        this.noData = ':( No Tool registered';
      }
    },
    async remove(id) {
      await this.$store.dispatch('actionRemoveTool', id);
      this.tools = this.getTools();
    },
  },
};
</script>
