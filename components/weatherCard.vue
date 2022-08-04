<template>
  <v-card width="80vw" class="pa-md-8 pa-3 text-center">
    <template v-if="!isLoading">
      <v-banner
        color="red"
        v-if="weatherData.alerts && weatherData.alerts.length > 0"
        class="mt-n8 mx-n8 mb-4"
      >
        <template v-for="alert in weatherData.alerts">
          <div class="d-flex">
            <div class="text-capitalize pr-4">{{ alert.event }}</div>
            <div v-html="alert.description" class="text-left" />
          </div>
        </template>
      </v-banner>
      <div class="pb-4">Weather for {{ locationString }}</div>
      <div class="text-h4 pb-4">
        {{ convertTemp(weatherData.current.temp, metricUnit) }}º{{
          metricUnit ? "C" : "F"
        }}
      </div>
      <div class="pb-4 text-capitalize">
        {{ weatherData.current.weather[0].description }}
      </div>
      <div class="pb-4">
        Feels like:
        {{ convertTemp(weatherData.current.feels_like, metricUnit) }}º{{
          metricUnit ? "C" : "F"
        }}
      </div>
      <v-row align="start">
        <v-col cols="12" md="4">
          <div>Humidity: {{ weatherData.current.humidity }}%</div>
          <div>
            Dew Point:
            {{ convertTemp(weatherData.current.dew_point, metricUnit) }}º{{
              metricUnit ? "C" : "F"
            }}
          </div>
          <div>
            Barometric Pressure
            {{ convertPressure(weatherData.current.pressure, metricUnit) }}
            {{ metricUnit ? "hPa" : "inHg" }}
          </div>
          <div>
            Percipitation over next hour: {{ getPrecipitationOverHour()
            }}{{ metricUnit ? "mm" : "in" }}
          </div>
        </v-col>
        <v-col cols="12" md="4">
          <div>
            <div>Wind information:</div>
            <v-tooltip right>
              <template v-slot:activator="{ on }">
                <v-icon
                  size="72"
                  :color="windSpeedColor()"
                  :style="windSpeedDirection()"
                  v-on="on"
                  >mdi-arrow-right-circle-outline
                </v-icon>
              </template>
              <span>
                <span
                  >{{
                    convertSpeed(weatherData.current.wind_speed, metricUnit)
                  }}
                  {{ metricUnit ? "km/h" : "mph" }} at
                  {{ weatherData.current.wind_deg }}º
                </span>
                <span v-if="weatherData.current.wind_gust !== undefined"
                  >Gusts
                  {{ convertSpeed(weatherData.current.wind_gust, metricUnit) }}
                  {{ metricUnit ? "km/h" : "mph" }}</span
                >
              </span>
            </v-tooltip>
          </div>
          <!-- <div>
            Wind Speed:
            {{ convertSpeed(weatherData.current.wind_speed, metricUnit) }}
            {{ metricUnit ? "km/h" : "mph" }}
          </div>
          <div>Wind Direction: {{ weatherData.current.wind_deg }}º</div> -->
        </v-col>
        <v-col cols="12" md="4">
          <div>Cloud cover: {{ weatherData.current.clouds }}%</div>
          <div>Sunrise: {{ getTime(weatherData.current.sunrise) }}</div>
          <div>Sunset: {{ getTime(weatherData.current.sunset) }}</div>
          <div>UV Index: {{ weatherData.current.uvi }}</div>
        </v-col>
      </v-row>
      <v-tabs centered fixed-tabs class="mt-6">
        <v-tab>48 Hour Forecast</v-tab>
        <v-tab>Seven-Day Forecast</v-tab>
        <v-tab-item>
          <HourlyForecast
            :hourly-forecast="weatherData.hourly"
            :metric-unit="metricUnit"
            class="my-4"
          />
        </v-tab-item>
        <v-tab-item>
          <DailyForecast
            :daily-forecast="weatherData.daily"
            :metric-unit="metricUnit"
            class="my-4"
          />
        </v-tab-item>
      </v-tabs>
      <div class="text-right">
        Updated: {{ getDate(weatherData.current.dt, true) }} at
        {{ getTime(weatherData.current.dt) }}
      </div>
    </template>
    <template v-else>
      <LoadingSpinner />
    </template>
  </v-card>
</template>

<script lang="ts">
import { reactive, toRefs, onMounted } from "@vue/composition-api";

import unitConversion from "~/data/unitConversion";
import getCountryName from "~/data/getCountryName";
import getLocation from "~/data/getLocation";

import getDateTime from "~/data/getDateTime";

import { WeatherData, MinutelyWeather } from "~/model/weatherData.model";

export default {
  name: "WeatherCard",
  props: {
    weatherData: {
      type: Object as unknown as WeatherData,
      required: true,
    },
    metricUnit: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  setup(props: any, context: any) {
    const state = reactive({
      locationString: "",
      isLoading: true,
    });

    const { convertTemp, convertSpeed, convertPrecipitation, convertPressure } =
      unitConversion();
    const { reverseGeoCode } = getLocation();
    const { getDate, getTime } = getDateTime();

    // get the location string (city, province, country) for display
    const getLocationString = async () => {
      const location = await reverseGeoCode(
        props.weatherData.lat,
        props.weatherData.lon
      );

      state.locationString = `${location[0].name}, ${
        location[0].state
      }, ${getCountryName(location[0].country)}`;

      return location.name;
    };

    // loop through the minutely weather and calculate the sum of precipitation expected in the next 60 minutes
    const getPrecipitationOverHour = () => {
      let precipitation = 0;

      props.weatherData.minutely.forEach((x: MinutelyWeather) => {
        precipitation += x.precipitation;
      });

      // if no participation expected return a zero with no trailing decimals
      if (precipitation === 0) {
        return 0;
      }
      const convert = convertPrecipitation(precipitation, props.metricUnit);

      return convert;
    };

    // take the wind direction and use its value to inject into the icons props to show its bearing
    const windSpeedDirection = () => {
      const windDirection = props.weatherData.current.wind_deg;

      return `transform:rotate(${windDirection}deg)`;
    };

    // take the wind speed and return a hex code to color the icon
    const windSpeedColor = () => {
      const windSpeed = convertSpeed(
        props.weatherData.current.wind_speed,
        true
      );

      let color = "undefined";

      if (windSpeed > 25) {
        color = "red";
      } else if (windSpeed > 15) {
        color = "orange";
      } else if (windSpeed > 8) {
        color = "yellow";
      }

      return color;
    };

    onMounted(async () => {
      await getLocationString();

      state.isLoading = false;
    });

    return {
      convertSpeed,
      convertTemp,
      convertPressure,
      getCountryName,
      getDate,
      getDateTime,
      getPrecipitationOverHour,
      getTime,
      getLocationString,
      reverseGeoCode,
      windSpeedColor,
      windSpeedDirection,
      ...toRefs(state),
    };
  },
  head() {
    if (this.locationString !== "") {
      return {
        title: `${this.locationString}`,
      };
    }
  },
};
</script>
