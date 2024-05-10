<template>
  <main class="min-h-screen">
    <AppHeader class="mb-16" title="Tools" :description="description" />
    <ul class="space-y-16">
      <li v-for="(tool, id) in tools" :key="id">
        <AppToolCard :tool="tool" />
      </li>
    </ul>
  </main>
</template>

<script setup>
const description =
  "All of my in chronological order.";
useSeoMeta({
  title: "Tools | Muhammad Farhan",
  description,
});

const { data: tools } = await useAsyncData("all-tools", () =>
  queryContent("/tools").sort({ published: -1 }).find()
);
</script>
