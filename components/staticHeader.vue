<template>
  <v-app-bar
    elevation="0"
    color="undefined"
    flat
    class="white-text static-header px-2 px-md-4"
  >
    <v-row justify="center" align="center" class="px-md-4 px-2">
      <v-toolbar-title class="d-none d-md-block cursor-default">
        <nuxt-link to="/">Weather</nuxt-link>
      </v-toolbar-title>
      <v-spacer />
      <v-text-field
        hide-details
        :prepend-icon="isGettingGeo ? 'mdi-dots-circle' : 'mdi-crosshairs-gps'"
        placeholder="Search weather by location"
        class="location"
        v-model="searchByLocation"
        @change="handleSearchByLocation"
        @keypress.enter="handleSearchByLocation"
        @click:prepend="handleRequestUserGeoLocation"
        dense
        :disabled="isGettingGeo"
      />
      <v-tooltip bottom>
        <template #activator="{ on, attrs }">
          <v-btn
            icon
            @click="handleChangeUnit"
            v-bind="attrs"
            v-on="on"
            class="mx-4"
          >
            <v-icon dense>
              {{
                metricUnit
                  ? "mdi-temperature-celsius"
                  : "mdi-temperature-fahrenheit"
              }}
            </v-icon>
          </v-btn>
        </template>
        <div>
          {{ metricUnit ? "Switch to Fahrenheit" : "Switch to Celsius" }}
        </div>
      </v-tooltip>
    </v-row>
  </v-app-bar>
</template>

<script>
import { reactive, toRefs, onMounted } from "@vue/composition-api";

export default {
  name: "StaticHeader",
  props: {
    metricUnit: {
      type: Boolean,
      required: true,
    },
  },
  setup(props, context) {
    const state = reactive({
      isGettingGeo: false,
      searchByLocation: "",
      userLocation: {
        lat: 0,
        lon: 0,
        timeStamp: 0,
      },
    });

    // emit to index that user is changing the units used across the app
    const handleChangeUnit = () => {
      context.emit("handleChangeUnit");
    };

    // if getting the users geolocation errors, emit to index the error
    const handleGetGeoError = () => {
      state.isGettingGeo = false;
      context.emit("handleGetGeoError");
    };

    // get the users location from their browsers geolocation
    // if successful, call the handleSearchByGeo method
    // if error, call the handleGetGeoError method
    const handleRequestUserGeoLocation = () => {
      // emit true to show the getting geolocation snackbar
      context.emit("handleGettingGeo", true);

      // change the icon in the header to show a loading spinner instead of button
      state.isGettingGeo = true;

      window.navigator.geolocation.getCurrentPosition(
        handleSearchByGeo,
        handleGetGeoError
      );
    };

    // emit to index the string the user has inputted to get weather from search term
    const handleSearchByLocation = () => {
      context.emit("setSearchByLocation", state.searchByLocation);
    };

    // if getting geolocation is successful, create payload and emit to index the payload of the location we want weather for
    const handleSearchByGeo = (location) => {
      state.userLocation.lat = location.coords.latitude;
      state.userLocation.lon = location.coords.longitude;
      state.userLocation.timeStamp = location.timestamp;

      state.isGettingGeo = false;

      // emit to index to hide the snackbar
      context.emit("handleGettingGeo", false);
      context.emit("setUserGeoLocation", state.userLocation);
    };

    return {
      handleChangeUnit,
      handleRequestUserGeoLocation,
      handleSearchByGeo,
      handleSearchByLocation,
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss" scoped>
.location {
  width: 200px;
}
</style>
