<template>
  <v-card class="footer">
    <div class="d-flex justify-space-between py-4 mx-9">
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
