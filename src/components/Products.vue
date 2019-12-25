<template>
  <section>
    <Spinner :loading="!tools.length" />

    <div v-if="tools.length" class="container">
      <div v-for="tool in tools" :key="tool.id" class="card">
          <h5 class="link">{{tool.title}}</h5>
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
      tools: [],
    };
  },
  async created() {
    this.getTools();
  },
  methods: {
    async getTools() {
      await this.$store.dispatch('actionTools');
      this.tools = this.$store.getters.getTools;
    },
  },
};
</script>
