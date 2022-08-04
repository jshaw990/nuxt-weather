<template>
  <div>
    <div class="text-h4">Seven-Day Forecast</div>
    <v-data-table
      :headers="headers"
      :items="dailyForecast"
      hide-default-footer
      class="text-left"
    >
      <template v-slot:item.dt="{ item }">
        {{ getDate(item.dt, true) }}
      </template>
      <template v-slot:item.weather[0].id="{ item }">
        <v-tooltip left>
          <template v-slot:activator="{ on }">
            <v-icon v-on="on">{{ getIcon(item.weather[0].id) }}</v-icon>
          </template>
          <span class="text-capitalize">{{ item.weather[0].description }}</span>
        </v-tooltip>
      </template>
      <template v-slot:item.temp.max="{ item }">
        {{ convertTemp(item.temp.max, metricUnit) }}º{{
          metricUnit ? "C" : "F"
        }}
      </template>
      <template v-slot:item.temp.min="{ item }">
        {{ convertTemp(item.temp.min, metricUnit) }}º{{
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

import { DailyWeather } from "~/model/weatherData.model";

export default {
  name: "DailyForecast",
  props: {
    dailyForecast: {
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
    const { getDate } = getDateTime();
    const { getIcon } = getWeatherConditionIcon();

    const headers = [
      {
        text: "Date",
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
        text: "High",
        align: "",
        sortable: false,
        value: "temp.max",
      },
      {
        text: "Low",
        align: "",
        sortable: false,
        value: "temp.min",
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
      getDate,
      getIcon,
    };
  },
};
</script>
