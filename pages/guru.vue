<!-- <template>
  <main class="min-h-screen">
    <AppHeader
      class="mb-12"
      title="What's in my bag?"
      :description="description"
    />
    <div class="space-y-24">
      <ul class="space-y-8">
        <AppUsesHeader title="Hardware" />
        <AppUsesItem v-for="(item, id) in hardware" :key="id" :item="item" />
      </ul>
      <ul class="space-y-8">
        <AppUsesHeader title="Software" />
        <AppUsesItem v-for="(item, id) in software" :key="id" :item="item" />
      </ul>
      <ul class="space-y-8">
        <AppUsesHeader title="Desk" />
        <AppUsesItem v-for="(item, id) in desk" :key="id" :item="item" />
      </ul>
      <ul class="space-y-8">
        <AppUsesHeader title="Other" />
        <AppUsesItem v-for="(item, id) in other" :key="id" :item="item" />
      </ul>
    </div>
  </main>
</template>

<script setup>
const description =
  "Software I use, gadgets I love, and other things I recommend. Here’s a big list of all of my favorite stuff.";
  useSeoMeta({
  title: "Collections | Muhammad Farhan",
  description,
});
const { data: items } = await useAsyncData("uses", () =>
  queryContent("/guru").find()
);
const hardware = items.value.filter((item) => item.category === "hardware");
const software = items.value.filter((item) => item.category === "software");
const desk = items.value.filter((item) => item.category === "desk");
const other = items.value.filter((item) => item.category === "others");
</script> -->

<template>
  <main class="min-h-screen">
    <AppHeader class="mb-12" title="Gurus" :description="description" />
    <div class="space-y-4">
      <AppGuruCard
        v-for="(guru, id) in gurus"
        :key="id"
        :guru="guru"
      />
    </div>
  </main>
</template>

<script setup>
const description =
  "I’ve worked on tons of little projects over the years but these are the ones that I’m most proud of. Many of them are open-source, so if you see something that piques your interest, check out the code and contribute if you have ideas for how it can be improved.";
useSeoMeta({
  title: "Guru | Muhammad Farhan",
  description,
});

const { data: gurus } = await useAsyncData("guru-all", () =>
  queryContent("/guru").find()
);
</script>
