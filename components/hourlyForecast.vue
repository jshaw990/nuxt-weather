<template>
  <div>
    <div class="text-h4">48 Hour Forecast</div>
    <v-data-table
      :headers="headers"
      :items="hourlyForecast"
      :items-per-page="48"
      hide-default-footer
      class="text-left"
    >
      <template v-slot:item.dt="{ item }">
        {{ getTime(item.dt) }}
      </template>
      <template v-slot:item.weather[0].id="{ item }">
        <v-tooltip left>
          <template v-slot:activator="{ on }">
            <v-icon v-on="on">{{ getIcon(item.weather[0].id) }}</v-icon>
          </template>
          <span class="text-capitalize">{{ item.weather[0].description }}</span>
        </v-tooltip>
      </template>
      <template v-slot:item.temp="{ item }">
        {{ convertTemp(item.temp, metricUnit) }}º{{ metricUnit ? "C" : "F" }}
      </template>
      <template v-slot:item.feels_like="{ item }">
        {{ convertTemp(item.feels_like, metricUnit) }}º{{
          metricUnit ? "C" : "F"
        }}
      </template>
      <template v-slot:item.pop="{ item }">
        {{ Math.round(item.pop * 100) }}%
      </template>
      <template v-slot:item.humidity="{ item }">
        {{ item.humidity }}%
      </template>
      <template v-slot:item.wind_speed="{ item }">
        {{ convertSpeed(item.wind_speed, metricUnit) }}
        {{ metricUnit ? "km/h" : "mph" }}
      </template>
    </v-data-table>
  </div>
</template>

<script>
import unitConversion from "~/data/unitConversion";
import getDateTime from "~/data/getDateTime";
import getWeatherConditionIcon from "~/data/getWeatherConditionIcon";

import { HourlyWeather } from "~/model/weatherData.model";

export default {
  name: "HourlyForecast",
  props: {
    hourlyForecast: {
      type: Array,
      required: true,
    },
    metricUnit: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  setup() {
    const { convertTemp, convertSpeed } = unitConversion();
    const { getTime } = getDateTime();
    const { getIcon } = getWeatherConditionIcon();

    const headers = [
      {
        text: "Time",
        align: "",
        sortable: false,
        value: "dt",
      },
      {
        text: "",
        align: "",
        sortable: false,
        value: "weather[0].id",
      },
      {
        text: "Temp",
        align: "",
        sortable: false,
        value: "temp",
      },
      {
        text: "Feels Like",
        align: "",
        sortable: false,
        value: "feels_like",
      },
      {
        text: "POP",
        align: "",
        sortable: false,
        value: "pop",
      },
      {
        text: "Humdity",
        align: "",
        sortable: false,
        value: "humidity",
      },
      {
        text: "Wind Speed",
        align: "",
        sortable: false,
        value: "wind_speed",
      },
    ];

    return {
      headers,
      convertTemp,
      convertSpeed,
      getTime,
      getIcon,
    };
  },
};
</script>
