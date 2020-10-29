<template>
  <div class="p-3">
    <!-- Section heading -->
    <h2 class="mx-auto" style="windexth: 40">Our best projects</h2>
    <!-- Section description -->
    <p class="grey-text w-responsive mx-auto mb-5">
      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
      dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupindexatat non
      proindexent, sunt in culpa qui officia deserunt mollit est laborum.
    </p>

    <!-- <section v-for="(readme, index) in readmes" :key="index">
      <div v-html="$md.render(readme)"></div>
    </section> -->

    <div class="content-section-heading text-center">
      <h2 class="mb-5">Recent Projects</h2>
    </div>

    <ProjectCard v-model="open" />

    <b-container class="content-section" index="portfolio">
      <b-col v-for="(project, index) in projects" :key="project.index">
        <div class="portfolio-item" @click="openCard(index)">
          <div class="caption">
            <div class="caption-content">
              <div class="h2">{{ project.name }}</div>
              <p class="mb-0">Test</p>
            </div>
          </div>
          <b-img src="~/assets/images/placeholder.png" fluid alt="" />
        </div>
      </b-col>
    </b-container>
  </div>
</template>

<style scoped>
@import "~/assets/style/portfolio.css";
</style>

<script>
import ProjectCard from "@/components/ProjectCard";
export default {
  components: {
    ProjectCard,
  },
  data() {
    return {
      open: false,
      projects: [],
    };
  },
  async asyncData({ $axios, $modal }) {
    try {
      const { data } = await $axios.get("/projects");
      return { projects: data };
    } catch (e) {
      console.log(e);
    }
  },
  methods: {
    openCard(index) {
      this.projects[index].open = !this.projects[index].open ?? true;
    },
  },
};
</script>