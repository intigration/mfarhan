<template>
    <div>
      <h2 class="uppercase text-xs font-semibold text-gray-400 mb-6">
         Featured SkillS
      </h2>
      <ul class="space-y-16">
        <li v-for="(skill, id) in skills" :key="id">
          <AppSkillCard skill="skill" />
        </li>
      </ul>
      <div class="flex items-center justify-center mt-6 text-sm">
        <UButton
          label="All Skills &rarr;"
          to="/skills"
          variant="link"
          color="gray"
        />
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  const { data: skills } = await useAsyncData("skills-home", () =>
    queryContent("/skills")
      .sort({ published: -1 })
      .limit(3)
      .only(["title", "description", "slug", "_path"])
      .find()
  );
  </script>
  