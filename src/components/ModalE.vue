<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center" v-if="visible" @click.self="closeModal">
    <div class="bg-white p-4 sm:p-6 md:p-8 lg:p-10 w-11/12 sm:w-3/4 md:w-2/3 lg:w-1/2 h-auto max-h-screen rounded-md relative overflow-auto">
      <button class="absolute top-3 right-3 text-2xl text-gray-600 hover:text-gray-800" @click="closeModal">&times;</button>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    closeModal() {
      this.$emit('close');
    }
  }
}
</script>

<style scoped>
</style>
