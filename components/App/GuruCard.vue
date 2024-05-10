<template>
  <NuxtLink
    class="flex items-end gap-4 group p-2 -m-2 rounded-lg"
    :to="guru.link"
    target="_blank"
    external
  >
    <div class="max-w-sm">
      <h3 class="text-sm font-medium group-hover:text-primary-600">
        {{ guru.title.rendered }}
      </h3>
      <p class="text-gray-400 text-sm">{{ guru.excerpt.rendered }}</p>
    </div>
    <div
      class="flex-1 border-b border-dashed border-gray-300 dark:border-gray-800 group-hover:border-gray-700"
    ></div>
    <UAvatar
      :src="guru.thumbnail"
      :ui="{ rounded: 'rounded z-10 relative' }"
      size="md"
      :alt="guru.title.rendered"
    />
  </NuxtLink>
</template>

<script setup>
defineProps({
  guru: {
    type: Object,
    required: true,
  },
});
</script>
