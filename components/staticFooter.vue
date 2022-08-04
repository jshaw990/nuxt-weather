<template>
  <v-card class="footer" min-height="200">
    <v-footer>
      <v-card-text
        class="d-flex flex-column flex-sm-row text-center align-center align-sm-start justify-center"
      >
        <div class="mx-2 my-2 my-sm-0">Projects</div>
        <div class="mx-2 my-2 my-sm-0">Skills</div>
        <div class="mx-2 my-2 my-sm-0">Experience</div>
        <div class="mx-2 my-2 my-sm-0">Contact</div>
        <NuxtLink to="/blog" class="mx-2 my-2 my-sm-0">Blog</NuxtLink>
        <div class="mx-2 my-2 my-sm-0">Resume</div>
      </v-card-text>
      <v-card-text
        class="d-flex flex-row flex-sm-row text-center align-center align-sm-start justify-center"
      >
        <div class="mx-3 mx-sm-8 my-2 my-sm-0 pointer">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon v-on="on" v-bind="attrs" size="48">
                mdi-file-account
              </v-icon>
            </template>
            <div>Resume</div>
          </v-tooltip>
        </div>
        <div class="mx-3 mx-sm-8 my-2 my-sm-0 pointer">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon v-on="on" v-bind="attrs" size="48">mdi-email</v-icon>
            </template>
            <div>Email</div>
          </v-tooltip>
        </div>
        <div class="mx-3 mx-sm-8 my-2 my-sm-0 pointer">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon v-on="on" v-bind="attrs" size="48">mdi-github</v-icon>
            </template>
            <div>Github</div>
          </v-tooltip>
        </div>
        <div class="mx-3 mx-sm-8 my-2 my-sm-0 pointer">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon v-on="on" v-bind="attrs" size="48">mdi-linkedin</v-icon>
            </template>
            <div>LinkedIn</div>
          </v-tooltip>
        </div>
      </v-card-text>
    </v-footer>
    <div class="d-flex justify-space-between my-4 mx-9">
      <div>&copy; {{ getCurrentYear() }} Jayden Shaw</div>
      <div>
        <v-tooltip left>
          <template v-slot:activator="{ on, attrs }">
            <v-icon v-on="on" v-bind="attrs" @click="switchTheme">
              {{ dark ? "mdi-weather-night" : "mdi-white-balance-sunny" }}
            </v-icon>
          </template>
          <div>{{ dark ? "Switch to Light Mode" : "Switch to Dark Mode" }}</div>
        </v-tooltip>
      </div>
    </div>
  </v-card>
</template>

<script>
import { reactive, toRefs } from "@vue/composition-api";

export default {
  name: "StaticFooter",
  setup(props, context) {
    const state = reactive({
      dark: true,
    });

    const getCurrentYear = () => {
      const year = new Date().getFullYear();

      return year;
    };

    const handleThemeIcon = () => {
      if (state.dark) {
        return "mdi-weather-night";
      } else {
        return "mdi-white-balance-sunny";
      }
    };

    const switchTheme = () => {
      context.root.$vuetify.theme.dark = !context.root.$vuetify.theme.dark;
      state.dark = context.root.$vuetify.theme.dark;

      // set the location in local storage to the searched lat-lon
      localStorage.setItem(
        "userDarkMode",
        JSON.stringify(context.root.$vuetify.theme.dark)
      );

      console.log("check: ", JSON.stringify(context.root.$vuetify.theme.dark));
    };

    return {
      getCurrentYear,
      handleThemeIcon,
      switchTheme,
      ...toRefs(state),
    };
  },
};
</script>
