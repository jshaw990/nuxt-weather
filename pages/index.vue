<template>
  <v-col cols="12" class="pa-0">
    <v-banner v-if="errorExists" color="error" sticky icon="mdi-alert-circle">
      <span v-if="error.length > 0">{{ error }}</span>
      <span v-else>Theres an error</span>
    </v-banner>
    <StaticHeader
      :metricUnit="metricUnit"
      @handleChangeUnit="handleChangeUnit"
      @handleGetGeoError="handleGetGeoError"
      @handleGettingGeo="handleGettingGeo"
      @setUserGeoLocation="handleGetWeatherByLatLon"
      @setSearchByLocation="handleSearchByLocation"
    />
    <v-col
      v-if="!isLoading"
      class="my-12 d-flex flex-column justify-center align-center"
    >
      <div>
        <WeatherCard
          :weatherData="currentWeatherData"
          :metricUnit="metricUnit"
        />
      </div>
    </v-col>
    <v-col v-else class="my-12 d-flex flex-column justify-center align-center">
      <LoadingSpinner />
    </v-col>
    <v-snackbar bottom right :value="isGettingGeo" timeout="-1">
      <div class="d-flex justify-space-between">
        <span>Getting your location</span>
        <v-progress-circular indeterminate :size="20" />
      </div>
    </v-snackbar>
    <StaticFooter />
  </v-col>
</template>

<script lang="ts">
import { reactive, toRefs, onMounted } from "@vue/composition-api";

import getWeather from "~/data/getWeather";
import getLocation from "~/data/getLocation";
import getRandomLocation from "~/data/randomLocations";

import { UserLocation } from "~/model/userLocation.model";

export default {
  name: "Index",
  setup(props, context) {
    const { getByLatLon } = getWeather();
    const { geoCode } = getLocation();

    const state = reactive({
      error: "",
      errorExists: false,
      isGettingGeo: false,
      isLoading: true,
      currentWeatherData: {},
      metricUnit: true,
    });

    // upon receiving event from header
    // change the units to opposite
    // save teh change to local storage
    const handleChangeUnit = () => {
      state.metricUnit = !state.metricUnit;
      localStorage.setItem("userUnit", JSON.stringify(state.metricUnit));
    };

    // upon receiving event from header
    // display the error
    const handleGetGeoError = () => {
      state.errorExists = true;
      state.error = "There was an error retrieving your location";
    };

    // upon receiving event from the header
    // display or hide the snackbar based on bool payload
    const handleGettingGeo = (payload: boolean) => {
      state.isGettingGeo = payload;
    };

    // get the weather for a location based on lat-lon
    const handleGetWeatherByLatLon = async (userLocation: UserLocation) => {
      state.isLoading = true;

      const res = await getByLatLon(userLocation.lat, userLocation.lon);

      // if success, set the response to weatherdata
      console.log(res);
      if (res !== undefined || res.cod !== 400) {
        state.currentWeatherData = res;
        state.isLoading = false;

        // set the location in local storage to the searched lat-lon
        localStorage.setItem("userLocation", JSON.stringify(userLocation));
      } else {
        // else, throw an error
        state.errorExists = true;
        state.error = "There was an error";

        // state.isLoading = false;
      }
    };

    // get the lat-lon of a location based of string value
    const handleSearchByLocation = async (locationSearch: string) => {
      state.isLoading = true;
      const coordinates = await geoCode(locationSearch);

      // if success in getting lat-lon, get the weather for that location
      if (coordinates.cod !== 400 || coordinates.length > 0) {
        await handleGetWeatherByLatLon(coordinates[0]);
      } else {
        // else, throw an error
        state.errorExists = true;

        state.error = "Error retrieving location";
      }
    };

    const handleSetDarkMode = () => {
      let isDark = localStorage.getItem("userDarkMode");
      isDark = JSON.parse(isDark);

      if (isDark === undefined || isDark === null) {
        isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      }

      context.root.$vuetify.theme.dark = isDark;
      localStorage.setItem("userDarkMode", JSON.stringify(isDark));
    };

    onMounted(async () => {
      handleSetDarkMode();

      // get the previously viewed location from local storage
      let storedLocation = localStorage.getItem("userLocation");

      // get the previously used units from local storage
      let storedUnit = localStorage.getItem("userUnit");

      if (storedUnit) {
        if (storedUnit === "false") {
          state.metricUnit = false;
        }
        if (storedUnit === "true") {
          state.metricUnit = true;
        }
      }

      storedLocation = JSON.parse(storedLocation as string);

      // if a previously viewed location is in localStorage
      // get weather for that location
      if (storedLocation) {
        await handleGetWeatherByLatLon(
          storedLocation as unknown as UserLocation
        );
      } else {
        // otherwise, get a random set of lat-lon from the external getRandomLocation method
        const random = await getRandomLocation();

        const initialLocation = {
          lat: random.lat,
          lon: random.lon,
        };

        await handleGetWeatherByLatLon(initialLocation);
      }
    });

    return {
      handleChangeUnit,
      handleGetGeoError,
      handleGettingGeo,
      handleGetWeatherByLatLon,
      handleSearchByLocation,
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss">
a {
  color: inherit !important;
  text-decoration: none;
}
</style>
