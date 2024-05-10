<template>
  <main class="min-h-screen">
    <AppHeader class="mb-16" title="Skills" :description="description" />
    <ul class="space-y-16">
      <li v-for="(skill, id) in skills" :key="id">
        <AppSkillCard :skill="skill" />
      </li>
    </ul>
  </main>
</template>

<script setup>
const description =
  "All of my long-form thoughts on programming, user interfaces, product design, and more, collected in chronological order.";
useSeoMeta({
  title: "Skills | Muhammad Farhan",
  description,
});

const { data: skills } = await useAsyncData("all-articles", () =>
  queryContent("/skills").sort({ published: -1 }).find()
);
</script>
