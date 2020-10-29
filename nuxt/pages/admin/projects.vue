<template>
  <div id="form">
    <b-card class="mb-4">
      <h3>
        {{
          current_mode === "edit" ? "Edit your project" : "Create a new project"
        }}
      </h3>
      <b-form @submit="onSubmit">
        <b-form-input
          id="input-0"
          v-model="form.id"
          v-show="false"
        ></b-form-input>

        <b-form-group id="input-group-1" label="Name:" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="form.name"
            required
            placeholder="Enter name"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Type:" label-for="input-2">
          <b-form-select
            v-model="form.type"
            :options="options"
            required
          ></b-form-select>
        </b-form-group>

        <div v-show="form.type === 'github'">
          <b-form-group
            id="input-group-2"
            label="Github username:"
            label-for="input-2"
          >
            <b-form-input
              id="input-2"
              v-model="form.github_username"
              placeholder="Enter github username"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-3"
            label="Github repository name:"
            label-for="input-3"
          >
            <b-form-input
              id="input-3"
              v-model="form.github_repo"
              placeholder="Enter github repository name"
            ></b-form-input>
          </b-form-group>
        </div>
        <b-button type="submit" variant="primary" class="text-capitalize">{{
          current_mode
        }}</b-button>
        <b-button
          v-show="current_mode === 'edit'"
          variant="danger"
          @click="reset()"
          >Back to creation</b-button
        >
      </b-form>
    </b-card>

    <b-list-group>
      <b-list-group-item
        v-for="project in projects"
        :key="project.id"
        class="d-flex justify-content-between align-items-center"
      >
        <b-row>
          <b-col>
            <p>{{ project.name }}</p>
          </b-col>
          <div class="w-100"></div>
          <b-col>
            <b-button variant="danger" @click="del(project)">Delete</b-button>
            <b-button variant="success" @click="edit(project)">Edit</b-button>
          </b-col>
        </b-row>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<style>
#form {
  margin: 20px auto;
  width: 50%;
}
</style>

<script>
const toastConfig = {
  duration: 3000,
  position: "bottom-center",
};

export default {
  layout: "admin",
  data() {
    return {
      current_mode: "create",
      projects: [],
      form: {
        name: "",
        type: "",
        github_username: "",
        github_repo: "",
      },
      options: [
        { value: "github", text: "Project with github repository." },
        { value: "normal", text: "Regular project." },
      ],
    };
  },
  async asyncData({ $axios }) {
    try {
      const { data } = await $axios.get("/projects");
      return { projects: data };
    } catch (e) {
      console.log(e);
    }
  },
  methods: {
    reset() {
      this.current_mode = "create";
      for (var key in this.form) {
        this.form[key] = "";
      }
    },
    edit(project) {
      this.current_mode = "edit";

      for (var key in this.form) {
        this.form[key] = "";
      }

      this.form = Object.assign({}, project);
    },
    async del(project) {
      try {
        await this.$axios.delete(`/projects/delete/${project.id}`);
        this.projects = this.projects.filter((el) => el.id !== project.id);
      } catch (e) {
        console.log(e);
      }
    },
    async onSubmit(evt) {
      evt.preventDefault();
      try {
        const result = await this.$axios.post("/projects", this.form);
        
        this.projects = this.projects.filter((el) => el.id !== this.form.id);
        this.$toast.success(
          `Project ${this.current_mode === "create" ? "created" : "edited"}.`,
          toastConfig
        );
        this.projects.push(Object.assign({}, this.form));
      } catch (err) {
        this.$toast.error(err.response.data.message, toastConfig);
      }
    },
  },
};
</script>