<template>
  <NuxtLink :to="skill._path" class="group">
    <!-- View Only -->
    <!-- <skill>
        <time
          class="relative z-10 order-first mb-3 flex items-center text-sm text-gray-400 dark:text-gray-500 pl-3.5"
          datetime="2022-09-05"
          ><span
            class="absolute inset-y-0 left-0 flex items-center"
            aria-hidden="true"
            ><span
              class="h-4 w-0.5 rounded-full bg-gray-200 dark:bg-gray-500"
            ></span
          ></span>
          {{ getReadableDate(skill.published) }}
        </time>
        <h2
          class="text-base font-semibold font-display tracking-tight text-gray-800 dark:text-gray-100 group-hover:text-primary-600"
        >
          {{ skill.title }}
        </h2>
        <p class="relative z-10 mt-2 text-sm text-gray-600 dark:text-gray-400">
          {{ skill.description }}
        </p>
      </skill> -->
    <div class="max-w-sm">
      <h3 class="text-sm font-medium group-hover:text-primary-600">
        {{ skill.title }}
      </h3>
      <p class="text-gray-400 text-sm">{{ skill.description }}</p>
    </div>
    <div class="flex-1 border-b border-dashed border-gray-300 dark:border-gray-800 group-hover:border-gray-700"></div>
    <UAvatar :src="skill.imageUrl" :ui="{ rounded: 'rounded z-10 relative' }" size="md" :alt="skill.title" />
  </NuxtLink>
</template>
  
<script setup>
defineProps({
  skill: {
    type: Object,
    required: true,
  },
});

const getReadableDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
</script>