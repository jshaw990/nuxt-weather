<template>
  <v-col cols='12'>
    <v-col v-if='!isLoading' class='my-12 d-flex flex-column justify-center align-center'>
      <div v-if='error === ""'>
      Current Temperture: 
      {{ kelvinToCelsius(currentWeatherData.main.temp) }}
      </div>
      <div v-else>
        {{ error }}
      </div>
    </v-col>
    <v-col v-else class='my-12 d-flex flex-column justify-center align-center'>
      <v-progress-circular
        indeterminate 
        :size='50'
        class='mb-8'
      />
      <div>Loading...</div>
    </v-col>
  </v-col>
</template>
<script>
import { reactive, toRefs, onMounted } from '@vue/composition-api'

import getWeather from '~/data/getWeather'

export default {
  name: "Index",
  setup() {
    const { getCurrentWeather } = getWeather()

    const state = reactive({
      error: "",
      isLoading: true,
      currentWeatherData: {},
    })

    const kelvinToCelsius = (value) => {
      const temp = value - 273.15

      return Math.round(temp)
    }

    onMounted(async () => {
      const lat = '50.744525'
      const lng = '-113.970381'

      const response = await getCurrentWeather(lat, lng)

      if (response !== undefined && response.cod === 200) {
        state.currentWeatherData = response
  
        state.isLoading = false
      } else {
        state.error = 'There was an error'

        state.isLoading = false
      }
      
    })

    return {
      kelvinToCelsius,
      ...toRefs(state)
    }
  }
};
</script>
