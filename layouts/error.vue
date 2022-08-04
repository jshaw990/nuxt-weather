<template>
  <v-app dark>
    <v-col cols="12" class="pa-0">
      <v-app-bar
        elevation="0"
        color="undefined"
        flat
        class="white-text static-header px-2 px-md-4"
      >
        <v-row justify="center" align="center" class="px-md-4 px-2">
          <v-toolbar-title class="cursor-default">
            <nuxt-link to="/">Weather</nuxt-link>
          </v-toolbar-title>
          <v-spacer />
        </v-row>
      </v-app-bar>
      <div class="my-12 d-flex flex-column justify-center align-center">
        <v-card width="80vw" height="300px" class="pa-md-8 pa-3 text-center">
          <div class="white--text">
            <div>
              Error
              <a
                href="https://en.wikipedia.org/wiki/List_of_HTTP_status_codes"
                target="_blank"
                >{{ error.statusCode }}</a
              >
            </div>
            <code class="d-block ma-6">
              {{ error.message }}
            </code>
            <v-btn
              color="primary"
              class="ma-3"
              @click="clearLocalStorageAndRedirect"
            >
              Try Again
            </v-btn>
          </div>
        </v-card>
      </div>
    </v-col>
  </v-app>
</template>

<script>
import { reactive, toRefs, onMounted } from "@vue/composition-api";

export default {
  name: "EmptyLayout",
  layout: "empty",
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  setup(props, context) {
    const clearLocalStorageAndRedirect = () => {
      localStorage.clear();
      $nuxt.$router.go("/");
    };

    const pageNotFound = "404 - Page Not Found";
    const otherError = "An Error Has Occured";

    onMounted(() => {
      switch (props.error.statusCode) {
        case 500:
          break;
        default:
          console.log(props.error);
      }
    });

    return {
      clearLocalStorageAndRedirect,
      pageNotFound,
      otherError,
    };
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
    return {
      title,
    };
  },
};
</script>
